import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaThreads, FaTiktok, FaYoutube, FaQuestion } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface SocialMediaIcons {
  FaQuestion: IconType
  Facebook: IconType
  Instagram: IconType
  X: IconType
  Linkedin: IconType
  TikTok: IconType
  YouTube: IconType
  Threads: IconType
  [key: string]: IconType
}


const sosmedIcons: SocialMediaIcons = {
    FaQuestion: FaQuestion,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    X: FaXTwitter,
    Linkedin: FaLinkedin,
    TikTok: FaTiktok,
    YouTube: FaYoutube,
    Threads: FaThreads
  };

export default sosmedIcons