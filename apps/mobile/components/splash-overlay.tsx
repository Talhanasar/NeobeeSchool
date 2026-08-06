import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Text, useWindowDimensions } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { BrandMark } from './brand-mark';
import { BeeMark } from './bee-mark';

const TRAIL_DOTS = 26;
const BEE_SIZE = 56;
const DOT_SIZE = 7;
const CENTER_OFFSET = (BEE_SIZE - DOT_SIZE) / 2;

const PATH_POINTS: readonly (readonly [number, number])[] = [
  [0, 0],
  [0.25, -22],
  [0.5, 10],
  [0.75, -16],
  [1, 0],
];

function pathYAt(t: number): number {
  for (let i = 0; i < PATH_POINTS.length - 1; i += 1) {
    const [x0, y0] = PATH_POINTS[i];
    const [x1, y1] = PATH_POINTS[i + 1];
    if (t <= x1) {
      return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0);
    }
  }
  return 0;
}

type SplashOverlayProps = {
  readonly ready: boolean;
  readonly onFinish: () => void;
};

export function SplashOverlay({ ready, onFinish }: SplashOverlayProps) {
  const [entranceDone, setEntranceDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { width, height } = useWindowDimensions();

  const containerOpacity = useRef(new Animated.Value(1)).current;
  const contentScale = useRef(new Animated.Value(1)).current;
  const markOpacity = useRef(new Animated.Value(0)).current;
  const markScale = useRef(new Animated.Value(0.7)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textShift = useRef(new Animated.Value(12)).current;
  const flight = useRef(new Animated.Value(0)).current;
  const beeOpacity = useRef(new Animated.Value(1)).current;
  const trailOpacity = useRef(new Animated.Value(1)).current;

  const flightX = flight.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, width + 100],
  });

  const flightY = flight.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -22, 10, -16, 0],
  });

  const flightTilt = flight.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['86deg', '78deg', '94deg', '80deg', '88deg'],
  });

  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  const exitAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    let isMounted = true;
    let entranceAnimation: Animated.CompositeAnimation | null = null;

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (!isMounted) return;

      setReduceMotion(enabled);

      if (enabled) {
        flight.setValue(1);
        beeOpacity.setValue(0);
        trailOpacity.setValue(0);
        markOpacity.setValue(1);
        markScale.setValue(1);
        textOpacity.setValue(1);
        textShift.setValue(0);
        setEntranceDone(true);
        return;
      }

      entranceAnimation = Animated.parallel([
        Animated.timing(flight, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(markOpacity, {
          toValue: 1,
          duration: 500,
          delay: 2300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(markScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          delay: 2300,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          delay: 3000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textShift, {
          toValue: 0,
          duration: 600,
          delay: 3000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);

      entranceAnimation.start(({ finished }) => {
        if (finished && isMounted) {
          setEntranceDone(true);
        }
      });
    });

    return () => {
      isMounted = false;
      if (entranceAnimation) {
        entranceAnimation.stop();
      }
    };
  }, [markOpacity, markScale, textOpacity, textShift, flight, beeOpacity, trailOpacity]);

  useEffect(() => {
    if (!ready || !entranceDone || finishedRef.current) return;

    finishTimerRef.current = setTimeout(() => {
      const exitAnimations: Animated.CompositeAnimation[] = [
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: reduceMotion ? 150 : 700,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ];

      if (!reduceMotion) {
        exitAnimations.push(
          Animated.timing(contentScale, {
            toValue: 1.06,
            duration: 700,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          })
        );
      }

      exitAnimationRef.current = Animated.parallel(exitAnimations);

      exitAnimationRef.current.start(({ finished }) => {
        if (finished && !finishedRef.current) {
          finishedRef.current = true;
          onFinishRef.current();
        }
      });
    }, 900);

    return () => {
      if (finishTimerRef.current) {
        clearTimeout(finishTimerRef.current);
      }
      if (exitAnimationRef.current) {
        exitAnimationRef.current.stop();
        exitAnimationRef.current = null;
      }
    };
  }, [ready, entranceDone, reduceMotion, containerOpacity, contentScale]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.cream,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        overflow: 'hidden',
        opacity: containerOpacity,
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: trailOpacity,
        }}
      >
        {Array.from({ length: TRAIL_DOTS }, (_, i) => {
          const t = i / TRAIL_DOTS;
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                left: -100 + t * (width + 200) + CENTER_OFFSET,
                top: height * 0.42 + pathYAt(t) + CENTER_OFFSET,
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
                backgroundColor: colors.honey,
                opacity: flight.interpolate({
                  inputRange: [t - 0.001, t, t + 0.39],
                  outputRange: [0, 0.55, 0.12],
                  extrapolate: 'clamp',
                }),
              }}
            />
          );
        })}
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: height * 0.42,
          opacity: beeOpacity,
          transform: [
            { translateX: flightX },
            { translateY: flightY },
            { rotate: flightTilt },
          ],
        }}
      >
        <BeeMark size={56} />
      </Animated.View>

      <Animated.View
        style={{
          alignItems: 'center',
          gap: space.s5,
          transform: [{ scale: contentScale }],
        }}
      >
        <Animated.View
          style={{
            opacity: markOpacity,
            transform: [{ scale: markScale }],
          }}
        >
          <BrandMark size={96} />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textShift }],
            alignItems: 'center',
            gap: 2,
          }}
        >
          {ready ? (
            <>
              <Text
                style={{
                  fontFamily: fontFamily.heading,
                  fontSize: text.xxl,
                  color: colors.hive,
                  lineHeight: text.xxl * 1.1,
                }}
              >
                Neobee
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito_800ExtraBold',
                  fontSize: 10,
                  letterSpacing: 2,
                  color: colors.honeyDeep,
                }}
              >
                INTERNATIONAL SCHOOL
              </Text>
            </>
          ) : null}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
