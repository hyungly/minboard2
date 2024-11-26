import Link from 'next/link';
import { Button, Card, Divider } from '@nextui-org/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CardItemProps {
  title: string;
  content: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, content }) => (
  <div className="flex justify-center">
    <Card 
      className="p-6 w-80 h-120 flex-shrink-0 bg-white dark:bg-gray-800 dark:text-gray-100 
                 shadow-xl dark:shadow-xl dark:shadow-gray-700"
    >
      <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
      <p className="text-md mb-6 text-justify">{content}</p>
      <Divider />
      <div className="flex flex-col items-center mt-4">
        <p className="text-sm mb-6 text-justify">
          로그인 후에 다양한 소식들을 자유롭게 공유해보세요.
        </p>
        <Link href="/login">
          <Button className="dark:bg-gray-700 dark:text-gray-100">로그인</Button>
        </Link>
      </div>
    </Card>
  </div>
);

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    centerMode: true,
    centerPadding: '0px',
    swipe: true,
    // customPaging: (i: number) => (
    //   <div 
    //     className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 
    //                mt-4 mx-1 cursor-pointer transition-colors 
    //                hover:bg-gray-500 dark:hover:bg-gray-400"
    //   />
    // ),
    dotsClass: "slick-dots !relative !flex !justify-center !p-0 !m-4",
    nextArrow: <div />,
    prevArrow: <div />,
  };

  const items = [
    {
      title: 'Minboard에 오신 것을 환영합니다!',
      content: 'Minboard는 새롭게 시작하는 소식 공유 게시판 서비스입니다. 꾸준히 새로운 기능들을 개발 중에 있으며, 앞으로 더욱 다양한 서비스를 제공할 예정입니다. 많은 관심과 참여 부탁드립니다!',
    },
    ...Array(4).fill(0).map((_, index) => ({
      title: `Dummy Card ${index + 1}`,
      content: `Dummy content for card ${index + 1}. More exciting features and updates coming soon!`,
    })),
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[350px]"> {/* Adjusted width to center the card */}
        <Slider {...settings}>
          {items && items.length > 0 && items.map((item, index) => (
            <CardItem 
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;