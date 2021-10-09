import { createGlobalStyle } from "styled-components";

/* Roboto */
import RobotoWoff from "../../assets/fonts/roboto/roboto-v29-latin-regular.woff";
import RobotoWoff2 from "../../assets/fonts/roboto/roboto-v29-latin-regular.woff2";
import RobotoTtf from "../../assets/fonts/roboto/roboto-v29-latin-regular.ttf";
import RobotoSvg from "../../assets/fonts/roboto/roboto-v29-latin-regular.svg";
import RobotoEot from "../../assets/fonts/roboto/roboto-v29-latin-regular.eot";
/* Work sans*/
import WorkSansWoff from "../../assets/fonts/workSans/work-sans-v11-latin-regular.woff";
import WorkSansWoff2 from "../../assets/fonts/workSans/work-sans-v11-latin-regular.woff2";
import WorkSansTtf from "../../assets/fonts/workSans/work-sans-v11-latin-regular.ttf";
import WorkSansSvg from "../../assets/fonts/workSans/work-sans-v11-latin-regular.svg";
import WorkSansEot from "../../assets/fonts/workSans/work-sans-v11-latin-regular.eot";

const FontStyle = createGlobalStyle`
/* roboto-regular - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(${RobotoEot}); /* IE9 Compat Modes */
  src: local(''),
       url(${RobotoWoff}) format('woff');
       url(${RobotoWoff2}) format('woff2');
       url(${RobotoTtf}) format('truetype');
       url(${RobotoSvg}#Roboto) format('svg');
       url(${RobotoEot}?#iefix) format('embedded-opentype');
}

/* work-sans-regular - latin */
@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  src: url(${WorkSansEot}); /* IE9 Compat Modes */
  src: local(''),
       url(${WorkSansWoff}) format('woff');
       url(${WorkSansWoff2}) format('woff2');
       url(${WorkSansTtf}) format('truetype');
       url(${WorkSansSvg}#Roboto) format('svg');
       url(${WorkSansEot}?#iefix) format('embedded-opentype');
}
`;

export default FontStyle;
