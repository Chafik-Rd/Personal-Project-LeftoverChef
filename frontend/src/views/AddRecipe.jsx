import { BackPage } from "../components/BackPage";
import { MainBackground } from "../components/MainBackground";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImagePlus, X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { unitsIngredients, levelsRecipe } from "../data/addIngredients";
import axios from "axios";

export const AddRecipe = () => {
  const [preview, setPreview] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    kcal: "",
    time: "",
    level: "",
    detail: "",
    // image: "",
    ingredient: [
      {
        name: "",
        quantity: "",
        unit: "",
      },
    ],
    steps: [""],
  });
  console.log(recipe)

  // Check empty data
  useEffect(() => {
    const checkEmpty = Object.values(recipe).some((value) => {
      if (Array.isArray(value)) {
        if (typeof value[value.length-1] === "object") {
          return Object.values(value[value.length-1]).some((item) => item.trim() === "");
        } else {
          return value[value.length-1].trim() === "";
        }
      }
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return false;
    });
    setIsSave(checkEmpty);
  }, [recipe]);

  const handlePreview = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      // setRecipe({ ...recipe, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOnchange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleOnSelect = (name, e) => {
    const modes = {
      level: e,
      ingredient: [{ ...recipe[name][0], unit: e }],
    };
    // console.log(modes[name]);
    setRecipe({ ...recipe, [name]: modes[name] });
  };

  const handleOnchangeArray = (key, index, obj, e) => {
    const newSteps = [...recipe[key]];
    if (obj === "obj") {
      newSteps[index][e.target.name] = e.target.value;
    }
    if (obj === "text") {
      newSteps[index] = e.target.value;
    }
    setRecipe({ ...recipe, [key]: newSteps });
  };

  const handleRemoveAtIndex = (key, index) => {
    const newData = recipe[key].filter((_, i) => i !== index);
    if (recipe[key].length > 1) {
      setRecipe({ ...recipe, [key]: newData });
    }
  };

  const handleAddItem = (key, mode) => {
    const array = {
      text: { type: recipe[key], value: "" },
      obj: {
        type: Object.values(recipe[key][recipe[key].length - 1]),
        value: {
          name: "",
          quantity: "",
          unit: "",
        },
      },
    };
    const checkEmpty = array[mode].type.some((step) => step.trim() === "");

    if (!checkEmpty) {
      setRecipe({ ...recipe, [key]: [...recipe[key], array[mode].value] });
    }
  };

  const handleSave = async () => {
    console.log(recipe);
    await axios.post("", recipe)
  };

  return (
    <MainBackground className="px-6 sm:px-8 py-4">
      <BackPage />
      <div className="flex flex-col gap-6 max-w-300 w-full mx-auto">
        {/* upload image */}
        <Card className="flex flex-col md:flex-row p-6 sm:p-7">
          {preview ? (
            // preview image
            <div
              className={`w-full cursor-pointer h-112 overflow-hidden ${
                !preview && "hidden"
              }`}
            >
              <X
                onClick={() => setPreview("")}
                strokeWidth={1.5}
                className="ml-auto"
              />
              {preview && (
                <img src={preview} className="h-112 w-full object-cover" />
              )}
            </div>
          ) : (
            // upload image
            <>
              <label
                htmlFor="file-upload"
                className="w-full h-112 border-brown-600 border border-dashed flex flex-col justify-center items-center cursor-pointer rounded-xl"
              >
                <ImagePlus
                  size={48}
                  strokeWidth={1.5}
                  className="text-gray-400"
                />
                <p>
                  <span className="text-blue-600">Upload a file</span> or drag
                  and drop
                </p>
                <small>PNG, JPG, GIF up to 10MB</small>
              </label>
              <Input
                type="file"
                id="file-upload"
                onChange={handlePreview}
                accept="image/png,image/jpeg"
                className=" hidden"
              />
            </>
          )}
        </Card>

        {/* Add info recipe */}
        <Card className="flex flex-col p-6 sm:p-7 max-w-300">
          <h3 className="text-xl sm:text-3xl font-medium">ข้อมูลพื้นฐาน</h3>
          <label>
            <p>ชื่อเมนู:</p>
            <Input
              onChange={handleOnchange}
              placeholder="ใส่ชื่อเมนูอาหาร"
              name="name"
              value={recipe.name}
            />
          </label>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <label className="w-full">
              <p>พลังงาน: (kcal)</p>
              <Input
                onChange={handleOnchange}
                placeholder="เช่น 350"
                name="kcal"
                value={recipe.kcal}
              />
            </label>
            <label className="w-full">
              <p>เวลาที่ใช้: (นาที)</p>
              <Input
                onChange={handleOnchange}
                placeholder="เช่น 5"
                name="time"
                value={recipe.time}
              />
            </label>
            <label className="w-full">
              <p>ระดับความยาก:</p>
              <Select onValueChange={(e) => handleOnSelect("level", e)}>
                <SelectTrigger>
                  <SelectValue placeholder="ระดับความยาก:" />
                </SelectTrigger>
                <SelectContent>
                  {levelsRecipe.slice(1).map((level) => (
                    <SelectItem key={level.id} value={level.level.value}>
                      {level.level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>
          <label>
            <p>คำอธิบาย:</p>
            <textarea
              onChange={handleOnchange}
              placeholder="อธิบายเกี่ยวกับเมนูอาหารนี้..."
              className="border p-3 border-brown-600 rounded-md w-full"
              name="detail"
              value={recipe.detail}
            ></textarea>
          </label>
        </Card>

        {/*  Add ingredient recipe */}
        <Card className="flex flex-col p-6 sm:p-7 max-w-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-3xl font-medium">วัตถุดิบ</h3>
            <Button
              onClick={() => {
                handleAddItem("ingredient", "obj");
              }}
              size="md"
              className="text-xl font-medium"
            >
              <Plus className="size-7" />
              เพิ่มวัตถุดิบ
            </Button>
          </div>
          {recipe.ingredient.map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4 p-3 rounded-lg bg-beige-200"
            >
              <div className="flex justify-between items-center w-full md:w-fit">
                <span className="rounded-full bg-beige-400 h-8 w-8 p-3 flex justify-center items-center text-xl font-medium">
                  {index + 1}
                </span>
                <span
                  onClick={() => handleRemoveAtIndex("ingredient", index)}
                  className="md:hidden cursor-pointer"
                >
                  <X size={24} className="w-6" />
                </span>
              </div>

              <label className="w-full">
                <Input
                  onChange={(e) =>
                    handleOnchangeArray("ingredient", index, "obj", e)
                  }
                  placeholder="ชื่อวัตถุดิบ"
                  name="name"
                  value={recipe.ingredient[index].name}
                />
              </label>
              <label className="w-full">
                <Input
                  onChange={(e) =>
                    handleOnchangeArray("ingredient", index, "obj", e)
                  }
                  placeholder="ปริมาณ"
                  name="quantity"
                  value={recipe.ingredient[index].quantity}
                />
              </label>
              <label className="w-full">
                <Select onValueChange={(e) => handleOnSelect("ingredient", e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="หน่วย:" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitsIngredients.map((unit) => (
                      <SelectItem key={unit.id} value={unit.unit.value}>
                        {unit.unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <span
                onClick={() => handleRemoveAtIndex("ingredient", index)}
                className="hidden md:block cursor-pointer"
              >
                <X size={24} className="w-6" />
              </span>
            </div>
          ))}
        </Card>

        {/* Add steps recipe */}
        <Card className="flex flex-col p-6 sm:p-7 max-w-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-3xl font-medium">วิธีทำ</h3>
            <Button
              onClick={() => {
                handleAddItem("steps", "text");
              }}
              size="md"
              className="text-xl font-medium"
            >
              <Plus className="size-7" />
              เพิ่มขั้นตอน
            </Button>
          </div>
          {recipe.steps.map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4 p-3 rounded-lg bg-beige-200"
            >
              <div className="flex justify-between items-center w-full md:w-fit">
                <span className="rounded-full bg-beige-400 h-8 w-8 p-3 flex justify-center items-center text-xl font-medium">
                  {index + 1}
                </span>
                <span
                  onClick={() => handleRemoveAtIndex("steps", index)}
                  className="md:hidden cursor-pointer"
                >
                  <X size={24} className="w-6" />
                </span>
              </div>

              <textarea
                placeholder={`ขั้นตอนที่ ${index + 1}...`}
                className="border p-3 border-brown-600 rounded-md w-full bg-white"
                onChange={(e) => handleOnchangeArray("steps", index, "text", e)}
                value={recipe.steps[index]}
              ></textarea>
              <span
                onClick={() => handleRemoveAtIndex("steps", index)}
                name="steps"
                className="hidden md:block cursor-pointer"
              >
                <X size={24} className="w-6" />
              </span>
            </div>
          ))}
        </Card>

        {/* Button save recipe*/}
        <div className="w-full flex justify-center">
          <Button
            onClick={() => handleSave()}
            size="lg"
            className={`text-2xl font-medium w-fit ${
              isSave && "pointer-events-none bg-brown-500/80"
            }`}
          >
            <Plus className="size-8" />
            เพิ่มเมนู
          </Button>
        </div>
      </div>
    </MainBackground>
  );
};
