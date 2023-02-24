import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { Navigation, Keyboard, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../style/swiper.css";
import "swiper/css";
import alternate from "../images/mar.jpg";
import { USER_DATA } from "../Data/sample";
import "../style/swiper.css";
import * as userService from "../services/user";

const FollowCard = () => {
  const [users, setUsers] = useState(null);

  async function getUsers() {
    const currentUser = await userService.getCurrentUser();
    console.log(currentUser.data);
    const users = await userService.getRandomUsers(4, currentUser.data.id);
    setUsers(users.data);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ minHeight: "100%" }} className="swipe">
      <Swiper
        effect={"coverflow"}
        speed={500}
        watchSlidesProgress={true}
        slidesPerView={"2.5"}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        coverflowEffect={{
          rotate: 50,
          depth: 1000,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Keyboard, Pagination, Navigation]}
        style={{ paddingBottom: "90px" }}
      >
        {users &&
          users.map((user) => (
            <SwiperSlide className="follow-swiper">
              <Paper className="paper-follow">
                <div>
                  <img id="image" src={user.imageUrl} />
                  <div className="name">{user.firstname}</div>
                  <div className="username">{user.username}</div>
                  <div>
                    <Button className="button" variant="contained">
                      Latch
                    </Button>
                  </div>
                </div>
              </Paper>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FollowCard;
