import Card from "./card";

type CardInput = {
  src: string,
  genre: string,
  title: string,
  author: string,
  date: string
}

const cardDataInput: CardInput[] = [
  {
    src: "/images/backend.svg",
    genre: "Backend",
    title: "The Power of Node.js for Scalable Applications",
    author: "By Alex Johnson",
    date: "Jan 20, 2024",
  },
  {
    src: "/images/uiux.svg",
    genre: "UI/UX Design",
    title: "Understanding User-Centered Design Principles",
    author: "By Sarah Lee",
    date: "Feb 1, 2024",
  },
  {
    src: "/images/dataScience.svg",
    genre: "Data Science",
    title: "Introduction to Machine Learning Algorithms",
    author: "By Michael Brown",
    date: "Feb 5, 2024",
  },
  {
    src: "/images/web-d.svg",
    genre: "Web Development",
    title: "Building Responsive Websites with Tailwind CSS",
    author: "By Emily Davis",
    date: "Jan 28, 2024",
  },
  {
    src: "/images/cloud.svg",
    genre: "Cloud Computing",
    title: "Getting Started with AWS and Cloud Services",
    author: "By David Wilson",
    date: "Feb 10, 2024",
  },
];

const Carousel = () => {
  return (
    <div className="relative mt-20 overflow-hidden w-full">
      <div className="flex gap-12 animate-scroll">
      {[...cardDataInput, ...cardDataInput].map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
      </div>
    </div>
  );
};

export default Carousel
