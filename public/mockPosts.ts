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
      url: "https://source.unsplash.com/random/780x400"

    },
    {
      id: 2,
      title: "Forest Path",
      description: "A serene path through a lush green forest.",
      url: "https://source.unsplash.com/random/200x200?sig=2"
    },
    {
      id: 3,
      title: "City Skyline",
      description: "A stunning view of the city skyline at night.",
      url: "https://source.unsplash.com/random/200x200?sig=3"
    },
    {
      id: 4,
      title: "Beach at Dawn",
      description: "A peaceful beach scene at dawn with gentle waves.",
      url: "https://source.unsplash.com/random/200x200?sig=4"
    },
    {
      id: 5,
      title: "Desert Dunes",
      description: "Golden sand dunes under a clear blue sky.",
      url: "https://source.unsplash.com/random/200x200?sig=5"
    },
    {
      id: 6,
      title: "Mountain Lake",
      description: "A crystal-clear lake surrounded by mountains.",
      url: "https://source.unsplash.com/random/200x200?sig=6"
    },
    {
      id: 7,
      title: "Snowy Forest",
      description: "A quiet forest blanketed in snow.",
      url: "https://source.unsplash.com/random/200x200?sig=7"
    },
    {
      id: 8,
      title: "Flower Field",
      description: "A vibrant field of colorful wildflowers.",
      url: "https://source.unsplash.com/random/200x200?sig=8"
    },
    {
      id: 9,
      title: "Ocean Waves",
      description: "Powerful waves crashing against rocky cliffs.",
      url: "https://source.unsplash.com/random/200x200?sig=9"
    },
    {
      id: 10,
      title: "Starry Night",
      description: "A mesmerizing view of the starry night sky.",
      url: "https://source.unsplash.com/random/200x200?sig=10"
    }
  ];
  
  export default mockPosts;
  