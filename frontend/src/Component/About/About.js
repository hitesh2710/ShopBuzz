import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/hiteshwarmdubey";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Page</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dvpf8wrtk/image/upload/v1695239086/avatars/Profile_gwtnla.png"
              alt="Founder"
            />
            <Typography>Hiteshwarm Dubey</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is the About page where you can find information about me.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Other Contacts</Typography>
           
            <a href="https://instagram.com/hiteshwarmdubey" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/hiteshwarm-dubey-2240b3213/" target="blank">
              <LinkedInIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;