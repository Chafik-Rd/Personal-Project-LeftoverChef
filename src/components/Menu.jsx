import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MenuCard } from "./MenuCard";
import { recommendedMenu } from "../data/recommendedMenu";
import { Search, Grid3x3, Rows3 } from "lucide-react";
import { useState } from "react";

export const Menu = () => {
  const [layout, setLayout] = useState(false);
    return (
    <div className="h-[calc(100vh-124px)] flex flex-col gap-6 items-center flex-1 px-2 sm:px-6 py-4 border-t-1 border-brown-600">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">เปลี่ยนของเหลือให้เป็นมื้ออร่อย !</h1>
      <section className="flex w-full gap-2 sm:gap-4">
        <label htmlFor="fliter" className="max-w-125 w-full">
          <Search
            size={20}
            strokeWidth={1.5}
            className="absolute my-2 ml-2 text-gray-500"
          />
          <Input
            id="fliter"
            type="text"
            placeholder="ค้นหาสูตรอาหาร..."
            className="peer px-8 max-w-125"
          />
        </label>
        <Select>
          <SelectTrigger className="w-27">
            <SelectValue placeholder="ทุกเวลา" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ทุกเวลา">ทุกเวลา</SelectItem>
            <SelectItem value="5นาที">5นาที</SelectItem>
            <SelectItem value="5-10นาที">5-10นาที</SelectItem>
            <SelectItem value="10-15นาที">10-15นาที</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-27">
            <SelectValue placeholder="ทุกระดับ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ทุกระดับ">ทุกระดับ</SelectItem>
            <SelectItem value="ง่าย">ง่าย</SelectItem>
            <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
            <SelectItem value="ยาก">ยาก</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1 flex justify-end">
          <div className="w-21 h-9 flex">
            <div onClick={()=>setLayout(false)}
            className={`w-full h-full rounded-l-md flex items-center justify-center cursor-pointer border-brown-600 ${layout?"border-1 text-brown-700":"border-y-1 bg-brown-500 text-white"}`}>
              <Grid3x3 strokeWidth={1.5} />
            </div>
            <div onClick={()=>setLayout(true)} className={`w-full h-full rounded-r-md flex items-center justify-center cursor-pointer border-brown-600 ${layout?"border-y-1 bg-brown-500 text-white":"border-1  text-brown-700"}`}>
              <Rows3 strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>
      <section className={`${layout?"flex flex-col":"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-cols-min"} gap-6 w-full overflow-y-auto`}>
        {recommendedMenu.map((menu) => (
          <MenuCard
            key={menu.id}
            name={menu.name}
            description={menu.description}
            img={menu.img}
            time={menu.time}
            menuForPeople={menu.menuForPeople}
            level={menu.level}
          />
        ))}
      </section>
    </div>
  );
};
