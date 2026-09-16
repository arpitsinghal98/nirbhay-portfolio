export const profile = {
  name: "Nirbhay Pratap Singh",
  firstName: "Nirbhay",
  role: "Full-stack & AI engineer",
  location: "Jaipur, India",
  email: "nirbhaydalnia@gmail.com",
  introduction:
    "I turn complex problems into intuitive web experiences and practical AI solutions. From the first idea to the last detail.",
  headline: {
    first: "Thoughtful software.",
    second: "Intelligent systems.",
  },
  portrait: {
    src: "/images/nirbhay.png",
    caption: "An engineer’s mind. A builder’s heart.",
  },
  resume: "/Nirbhay_Pratap_Singh_Resume.pdf",
  links: {
    github: "https://github.com/NirbhayPratapSingh",
    linkedin: "https://www.linkedin.com/in/nirbhay-pratap-singh-689580192/",
    writing: "https://medium.com/@nirbhaydalnia",
  },
} as const;

export const navigation = [
  {
    label: "Selected work",
    href: "#work",
  },
  {
    label: "About me",
    href: "#about",
  },
  {
    label: "Experience",
    href: "#experience",
  },
] as const;
