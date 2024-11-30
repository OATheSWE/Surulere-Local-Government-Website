import { Title, Text, Grid, Image, BackgroundImage } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../data";
import { ImageCollection } from "@/assets";
import { useEffect, useState } from "react";
import { api } from "../api";
import axios from "axios";

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


  const [advert, setAdvert] = useState();

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get(api.fetchAllAdverts, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.data.status === "success") {
          const allAdverts = response.data.adverts;

          // Randomly select one advert
          if (allAdverts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allAdverts.length);
            setAdvert(allAdverts[randomIndex]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch adverts:", error);
      }
    };

    fetchAdverts();
  }, []);


  return (
    <section ref={ref} className={`w-full py-10 ${styles.body} bg-default`}>
      <Grid gutter={90} className="font-sans mt-12">
        <Grid.Col span={{ base: 12 }}>
          <div className="text-black">
            <div className="my-2 text-center">
              <strong>Pre-Colonial Era</strong> 
              <ul>
                <li>
                  Surulere was originally inhabited by the Awori people, a
                  subgroup of the Yoruba ethnic group.
                </li>
                <li>The area was a major farming and fishing community.</li>
              </ul>
              <br />
              <strong>Colonial Era (1861-1960)</strong>
              <ul>
                <li>
                  1861: British colonialists arrived in Lagos and established
                  the city as a colony.
                </li>
                <li>
                  Late 19th century: Surulere became a popular residential area
                  for Africans and Europeans.
                </li>
                <li>
                  1914: The Nigerian Railway Corporation built a railway line
                  through Surulere, boosting economic growth.
                </li>
              </ul>
            </div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid gutter={90} className="font-sans mt-4">
        <Grid.Col span={{ base: 12, md: 6.7 }}>
          <div className="text-black">
            <div className="my-2 text-center">
              <strong>Post-Colonial Era (1960-1980)</strong>
              <ul>
                <li>1960: Nigeria gained independence from Britain.</li>
                <li>
                  1960s-1970s: Surulere experienced rapid urbanization and
                  growth, becoming a commercial hub.
                </li>
                <li>
                  1970s: The National Stadium (now Moshood Abiola Stadium) was
                  built, hosting international football matches.
                </li>
              </ul>
              <br />
              <strong>Modern Era (1980-Present)</strong>
              <ul>
                <li>
                  1980s: Surulere became a hub for entertainment, with the
                  establishment of the National Arts Theatre.
                </li>
                <li>
                  1990s: The area experienced infrastructure development,
                  including road construction and shopping centers.
                </li>
                <li>
                  2000s: Urban renewal efforts improved housing, transportation,
                  and amenities.
                </li>
                <li>
                  Present day: Surulere remains a vibrant, cosmopolitan area
                  with a mix of residential, commercial, and recreational
                  activities.
                </li>
              </ul>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5.3 }} className="flex">
          <div
            className="flex items-stretch max-lg:mx-auto"
          >
            <Image
              src={ImageCollection.hero}
              className="w-full object-cover object-top rounded-xl min-h-[200px]"
              alt="About Image"
            />
          </div>
        </Grid.Col>
      </Grid>

      <Grid gutter={90} className="font-sans mt-4">
        <Grid.Col span={{ base: 12 }}>
          <div className="text-black">
            <div className="my-2 text-center">
              <strong>Notable Landmarks</strong>
              <ul>
                <li>National Stadium (Moshood Abiola Stadium)</li>
                <li>National Arts Theatre</li>
                <li>Surulere Local Government Secretariat</li>
                <li>Adeniran Ogunsanya Shopping Centre</li>
                <li>Teslim Balogun Stadium</li>
              </ul>
              <br />
              <strong>Cultural Significance</strong>
              <ul>
                <li>Home to the famous Surulere Carnival</li>
                <li>
                  Hosts various cultural festivals, including the Awori Festival
                </li>
                <li>Hub for Nigerian music and arts</li>
              </ul>
              <br />
              <strong>Challenges</strong>
              <ul>
                <li>Traffic congestion</li>
                <li>Overcrowding</li>
                <li>Infrastructure decay</li>
                <li>Environmental concerns</li>
              </ul>
              <br />
              <strong>Future Developments</strong>
              <ul>
                <li>Proposed light rail system</li>
                <li>Renewal of the National Stadium</li>
                <li>Expansion of commercial and residential areas</li>
              </ul>
            </div>
          </div>
        </Grid.Col>
      </Grid>
      <BackgroundImage className={`w-full h-[250px] rounded-lg mt-12`} src={`${encodeURIComponent(advert?.advert_data?.file_path)}`} />

    </section>
  );
}
