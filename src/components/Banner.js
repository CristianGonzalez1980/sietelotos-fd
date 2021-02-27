import React, { useState, useEffect } from "react";
import { Slider, Slide, Caption } from 'react-materialize'
import "../styles/Banner.css";
import { postearGetEntity } from "./AdminPanel/FetchFunctions";

const Banner = () => {
  const [banners, setbanners] = useState(null)

  useEffect(() => {
    if (!banners) {
      postearGetEntity({ entityClass: "banners/HOME", fx: setbanners });
    }
  }, [banners])

  const getBanners = () => {
    if (!banners || banners.length === 0) {
      return (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )
    } else {
      const list = banners.map((banner) => {
        return (
          <Slide key={banner.id} image={<img alt="" id="bannerHome" src={banner.image} />}>
            <Caption placement="center">
            </Caption>
          </Slide>
        )
      }
      )
      return list
    }
  }

  return (
    <Slider id="indicatorsHomeBanner"
      fullscreen={false}
      options={{
        duration: 500,
        height: 400,
        indicators: true,
        interval: 6000
      }}
    >
      {getBanners()}
    </Slider>
  );
};
;

export default Banner;
