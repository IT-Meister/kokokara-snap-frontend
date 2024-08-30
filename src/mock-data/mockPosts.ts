export interface Post {
    id: number;
    title: string;
    description: string;
    url: string;
  }
  
  const mockPosts: Post[] = [
    {
      id: 1,
      title: "Sunset Over the Mountains",
      description: "A breathtaking sunset over the mountains.",
      url: "/mockImages/post1.jpg"

    },
    {
      id: 2,
      title: "Forest Path",
      description: "A serene path through a lush green forest.",
      url: "/mockImages/post2.jpg"
    },
    {
      id: 3,
      title: "City Skyline",
      description: "A stunning view of the city skyline at night.",
      url: "/mockImages/post3.jpg"
    },
    {
      id: 4,
      title: "Beach at Dawn",
      description: "A peaceful beach scene at dawn with gentle waves.",
      url: "/mockImages/post4.jpg"
    },
    {
      id: 5,
      title: "Desert Dunes",
      description: "Golden sand dunes under a clear blue sky.",
      url: "/mockImages/post5.jpg"
    },
    {
      id: 6,
      title: "Mountain Lake",
      description: "A crystal-clear lake surrounded by mountains.",
      url: "/mockImages/post6.jpg"
    },
    {
      id: 7,
      title: "Snowy Forest",
      description: "A quiet forest blanketed in snow.",
      url: "/mockImages/post7.jpg"
    },
    {
      id: 8,
      title: "Flower Field",
      description: "A vibrant field of colorful wildflowers.",
      url: "/mockImages/post8.jpg"
    },
    {
      id: 9,
      title: "Ocean Waves",
      description: "Powerful waves crashing against rocky cliffs.",
      url: "/mockImages/post9.jpg"
    },
    {
      id: 10,
      title: "Starry Night",
      description: "A mesmerizing view of the starry night sky.",
      url: "/mockImages/post10.jpg"
    }
  ];
  
  export default mockPosts;
  