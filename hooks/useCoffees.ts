import { useEffect, useState } from "react";

export const ALL_COFFEE = "All Coffee";

export type Coffee = {
  id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  image: any;
};

export const useCoffees = () => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: "Caffe Mocha",
          type: "Machiato",
          price: 4.53,
          rating: 4.8,
          image: require("@/assets/images/mocha.png"),
        },
        {
          id: 2,
          name: "Flat White",
          type: "Latte",
          price: 3.53,
          rating: 4.8,
          image: require("@/assets/images/flatwhite.png"),
        },
        {
          id: 3,
          name: "Mocha Fusi",
          type: "Latte",
          price: 3.99,
          rating: 4.7,
          image: require("@/assets/images/mochafusi.png"),
        },
        {
          id: 4,
          name: "Caffe Panna",
          type: "Latte",
          price: 2.99,
          rating: 4.6,
          image: require("@/assets/images/caffepana.png"),
        },
      ];

      setCoffees(data);
      setLoading(false);
    }, 1000);
  }, []);

  const types = [
    ALL_COFFEE,
    ...Array.from(new Set(coffees.map((c) => c.type))),
  ];

  return { coffees, loading, types };
};
