"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Laptop2,
  Shirt,
  Gamepad2,
  Home,
  Bike,
  Coffee,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useCallback, useState } from "react";

const categories = [
  {
    id: "books",
    name: "Books & Study",
    icon: BookOpen,
    count: 234,
    color: "from-teal-200 to-teal-400",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop2,
    count: 156,
    color: "from-indigo-200 to-indigo-400",
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: Shirt,
    count: 89,
    color: "from-rose-200 to-rose-400",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    count: 67,
    color: "from-green-200 to-green-400",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: Home,
    count: 45,
    color: "from-orange-200 to-orange-400",
  },
  {
    id: "vehicles",
    name: "Bikes & Scooters",
    icon: Bike,
    count: 23,
    color: "from-cyan-200 to-cyan-400",
  },
  {
    id: "food",
    name: "Food & Kitchen",
    icon: Coffee,
    count: 78,
    color: "from-amber-200 to-amber-400",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: Dumbbell,
    count: 34,
    color: "from-lime-200 to-lime-400",
  },
];

const CategoryGrid = () => {
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const getGridColumns = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4; // lg breakpoint
    if (window.innerWidth >= 768) return 3;  // md breakpoint
    return 2; // sm breakpoint
  }, []);

  const focusCategory = useCallback((index: number) => {
    if (categoryRefs.current[index]) {
      setFocusedIndex(index);
      categoryRefs.current[index]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    const gridCols = getGridColumns();
    const totalCategories = categories.length;
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % totalCategories;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex === 0 ? totalCategories - 1 : currentIndex - 1;
        break;
      case 'ArrowDown':
        e.preventDefault();
        newIndex = Math.min(totalCategories - 1, currentIndex + gridCols);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = Math.max(0, currentIndex - gridCols);
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = totalCategories - 1;
        break;
      default:
        return; // Don't focus if key isn't handled
    }

    focusCategory(newIndex);
  }, [focusCategory, getGridColumns]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[300px] bg-gradient-to-r from-teal-50 to-rose-50 blur-3xl opacity-50 rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-indigo-100 to-pink-100 blur-3xl rounded-full -z-10"></div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold tracking-tight text-slate-800">
            Explore by Category
          </h2>
          <p className="text-lg text-slate-500 mt-3 max-w-xl mx-auto">
            Buy, sell, or share items with students — discover what’s trending
            around your hostel.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  ref={(el) => (categoryRefs.current[i] = el)}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-3xl"
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onClick={() => {
                    // Add category selection logic here
                    console.log(`Selected category: ${category.name}`);
                  }}
                  aria-label={`Browse ${category.name} category, ${category.count} items available`}
                  tabIndex={i === focusedIndex ? 0 : -1} // Roving tabindex
                >
                  {/* Card Container */}
                  <div className="relative bg-white border border-slate-100 rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-focus:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    {/* Gradient Ribbon */}
                    <div
                      className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${category.color}`}
                    ></div>

                    {/* Card Content */}
                    <div className="p-8 flex flex-col items-center space-y-5 relative z-10">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-inner flex items-center justify-center`}
                      >
                        <Icon className="h-8 w-8 text-slate-700" aria-hidden="true" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-base font-semibold text-slate-800 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {category.count} items
                        </p>
                      </div>

                      {/* Floating Accent Circle */}
                      <div
                        className={`absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br ${category.color} rounded-full blur-3xl opacity-0 group-hover:opacity-60 group-focus:opacity-60 transition-all duration-500`}
                      ></div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            className="group px-6 py-5 border-slate-300 text-slate-700 font-medium hover:bg-gradient-to-r hover:from-teal-500 hover:to-indigo-500 hover:text-white hover:border-transparent rounded-full transition-all shadow-sm"
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
