import { Title, Text, Grid, Image } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../data";
import { ImageCollection } from "@/assets";

export default function SingleBlog() {
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
  const rightColAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <section ref={ref} className={`w-full py-10 ${styles.body} bg-default`}>
      <Grid gutter={90} className={`font-sans mt-4`}>
        <Grid.Col span={{ base: 12 }} className="">
          <animated.div
            style={leftColAnimation}
            className="flex flex-col items-stretch max-lg:mx-auto"
          >
            <Image
              src={ImageCollection.chairman}
              className={`w-full object-cover mb-1 shadow-2xl object-top rounded-xl max-h-[400px
                ] h-full`}
              alt="Blog Image"
            />
            <div><span className="text-[13px]">Daniel Ajuwon,</span><span className="text-[13px]"> 2 Hours</span></div>
          </animated.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={rightColAnimation2} className={`text-black`}>
            <Title className={`text-black font-sans mb-2 text-center`} order={4}>
              Lawyer evicts church over illegal possession of property
            </Title>

            <Text className="my-2">
              Founded in 2023, Krowdkontrollers aims to establish a versatile
              ticket management platform, empowering event planners to sell
              tickets for diverse occasions, from intimate gatherings to
              sprawling music festivals. Our platform offers organizers
              comprehensive control and oversight, setting a new benchmark for
              event management both nationally and globally. from intimate
              gatherings to sprawling music festivals. Our platform offers
              organizers comprehensive control and oversight, setting a new
              benchmark for event management both nationally and globallyh from
              intimate gatherings to sprawling music festivals. Our platform
              offers organizers comprehensive control and oversight, setting a
              new benchmark for event management both nationally and globallyh
            </Text>
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
