import { Title, Text, Grid, Image } from "@mantine/core";
import classes from "./About.module.css";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../../data";
import { ImageCollection } from "../../../assets";

export default function About2() {
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
    transform: inView ? "translateX(0)" : "translateX(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <section ref={ref} className={`w-full py-10 ${styles.body} bg-white`}>
      <Grid gutter={90} className={`font-sans mt-12`}>
        <Grid.Col span={{ base: 12, md: 5.3 }} className="flex">
          <animated.div
            style={leftColAnimation}
            className="flex items-stretch max-lg:mx-auto"
          >
            <Image
              src={ImageCollection.about1}
              className={`w-full object-cover object-top rounded-xl`}
              alt="About Image"
            />
          </animated.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6.7 }}>
          <animated.div style={rightColAnimation} className={``}>
            <Title className={`text-primary font-sans mb-2`} order={4}>
              Misson and Vision
            </Title>

            <Title className={classes.title} order={2}>
              Empowering Events, Elevating Culture
            </Title>

            <Text className="my-2">
              Our mission and vision converge to establish Krowdkontrollers as
              the ultimate destination for streamlined event hosting and
              ticketing. We strive to build a community of creative youths while
              promoting Nigeria's pop culture, envisioning a future where we are
              the go-to site for all buzzing events nationwide. With a network
              of innovative youths sharing and promoting ideas, we aim to excel
              as the premier ticketing platform, setting the standard for event
              management in Nigeria and beyond."
            </Text>

          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
