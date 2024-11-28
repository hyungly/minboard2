import Link from 'next/link';
import { Button, Card, Divider } from '@nextui-org/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CardItemProps {
  title: string;
  content: string;
  isFirstCard?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ title, content, isFirstCard = false }) => (
  <div className="flex justify-center">
    <Card 
      className="p-6 w-80 h-auto flex-shrink-0 mx-4 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg dark:shadow-lg dark:shadow-gray-700"
    >
      <h1 className="text-xl font-semibold mb-4 text-center"> <span dangerouslySetInnerHTML={{ __html: title }} /></h1>
      <p className="text-md mb-6 text-justify">{content}</p>
      
      {/* 첫 번째 카드에만 추가 영역 표시 */}
      {isFirstCard && (
        <>
          <Divider />
          <div className="flex flex-col items-center mt-4">
            <p className="text-sm mb-6 text-center">
              로그인 후 다양한 소식들을 자유롭게 공유해보세요.
            </p>
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          </div>
        </>
      )}
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
    arrows: true, centerMode: true, centerPadding: '0',
    swipe: true, // 터치 슬라이딩 기능
  };

  const items = [
    {
      title: 'Minboard에 오신 것을<br /> 환영합니다!',
      content: 'Minboard는 웹 앱 서비스입니다. 꾸준히 새로운 기능들을 개발 중에 있으며, 앞으로 더욱 다양한 서비스를 제공할 예정입니다. 많은 관심과 참여 부탁드립니다!',
    },
    {
      title: '개발 끝',
      content: '목 허리도 끝',
    },
    {
      title: '일단은 이렇게 만들었는데',
      content: '무슨 기능을 추가하면 좋을까요? 게시판에 적어주세요',
    },
    {
      title: '코딩은 즐겁다',
      content: '근데 꼭 그렇지만도 않다.',
    },
    {
      title: '헬스는 항상 즐겁다',
      content: '헬스하세요.',
    },
    
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
       <img src="/itiswhatitis.png" className='rounded-b-xl'/>
      <div>
        <Slider {...settings} className="w-full  mt-4 max-w-md">
          {items && items.length > 0 && items.map((item, index) => (
            <CardItem
              key={index}
              title={item.title}
              content={item.content}
              isFirstCard={index === 0}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;