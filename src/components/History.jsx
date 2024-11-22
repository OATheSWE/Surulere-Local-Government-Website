import { Title, Text, Grid, Image } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../data";
import { ImageCollection } from "@/assets";

export default function History() {
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  // Animation for the left column (coming from the left)
  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation3 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <section ref={ref} className={`w-full py-10 ${styles.body} bg-default`}>
      <Grid gutter={90} className={`font-sans mt-12`}>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={rightColAnimation} className={`text-black`}>
            <Text className="my-2 text-center">
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally.
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally.
            </Text>
          </animated.div>
        </Grid.Col>
      </Grid>
      <Grid gutter={90} className={`font-sans mt-4`}>
        <Grid.Col span={{ base: 12, md: 6.7 }}>
          <animated.div style={rightColAnimation2} className={`text-black`}>
            <Text className="my-2 text-center">
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally. from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globallyh
            </Text>

          </animated.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5.3 }} className="flex">
          <animated.div
            style={leftColAnimation}
            className="flex items-stretch max-lg:mx-auto"
          >
            <Image
              src={ImageCollection.hero}
              className={`w-full object-cover object-top rounded-xl min-h-[200px
                ]`}
              alt="About Image"
            />
          </animated.div>
        </Grid.Col>
      </Grid>
      <Grid gutter={90} className={`font-sans mt-4`}>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={rightColAnimation3} className={`text-black`}>
            <Text className="my-2 text-center">
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally.
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally.
            </Text>
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
