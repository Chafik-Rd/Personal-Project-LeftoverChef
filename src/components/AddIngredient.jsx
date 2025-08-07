import { iconsIngredients } from '../data/addIngredients'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AddIngredient = ({onClick}) => {
  return (
    <div className="fixed top-0 left-0 z-15 h-screen w-full bg-black/80 flex justify-center items-center">
          <div className="max-w-125 w-full bg-white px-8 py-6 rounded-4xl text-xl font-medium">
            <X
              onClick={()=>onClick(false)}
              className="ml-auto cursor-pointer rounded hover:bg-beige-300"
            />

            <h2 className="text-center text-3xl font-bold mb-6">
              เพิ่มวัตถุดิบ
            </h2>

            {/* Input ingredient */}
            <div className="flex flex-col gap-4">
              <label>
                <p>ชื่อวัตถุดิบ:</p>
                <Input placeholder="ใส่ชื่อวัตถุดิบ" />
              </label>
              <div className="flex gap-3">
                <label className="w-full">
                  <p>จำนวน:</p>
                  <Input placeholder="ใส่จำนวนวัตถุดิบ" />
                </label>
                <div className="w-full h-full">
                  <p>หน่วย:</p>
                <Select>
                  <SelectTrigger className="py-3">
                    <SelectValue placeholder="ทุกระดับ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ทุกระดับ">ทุกระดับ</SelectItem>
                    <SelectItem value="ง่าย">ง่าย</SelectItem>
                    <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                    <SelectItem value="ยาก">ยาก</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>

              {/* Select icon */}
              <div>
                <h3>ไอคอน:</h3>
                <div className="flex gap-3 flex-wrap h-27 overflow-y-scroll">
                  {iconsIngredients.map((icon) => (
                    <Button
                      key={icon.id}
                      variant="outline"
                      size="icon"
                      className="border-brown-600"
                    >
                      <img src={icon.icon.url} alt={icon.icon.alt} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Butun */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={()=>onClick(false)}
                  variant="outline"
                  size="md"
                  className="border-brown-600"
                >
                  ยกเลิก
                </Button>
                <Button size="md">เพิ่ม</Button>
              </div>
            </div>
          </div>
        </div>
  )
}
