"use client";

import { useState } from "react";

type Category = "Length" | "Weight" | "Temperature" | "Area" | "Volume" | "Speed";

const units: Record<Category, string[]> = {
    Length: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Miles", "Yards", "Feet", "Inches"],
    Weight: ["Kilograms", "Grams", "Milligrams", "Pounds", "Ounces"],
    Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    Area: ["Square Meters", "Square Kilometers", "Square Feet", "Square Yards", "Acres"],
    Volume: ["Liters", "Milliliters", "Cubic Meters", "Gallons", "Cups"],
    Speed: ["Meters/second", "Kilometers/hour", "Miles/hour", "Feet/second"],
};

const factors: Record<string, number> = {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Millimeters: 0.001,
    Miles: 1609.344,
    Yards: 0.9144,
    Feet: 0.3048,
    Inches: 0.0254,

    Kilograms: 1,
    Grams: 0.001,
    Milligrams: 0.000001,
    Pounds: 0.45359237,
    Ounces: 0.028349523125,

    "Square Meters": 1,
    "Square Kilometers": 1000000,
    "Square Feet": 0.09290304,
    "Square Yards": 0.83612736,
    Acres: 4046.8564224,

    Liters: 1,
    Milliliters: 0.001,
    "Cubic Meters": 1000,
    Gallons: 3.785411784,
    Cups: 0.2365882365,

    "Meters/second": 1,
    "Kilometers/hour": 0.2777777778,
    "Miles/hour": 0.44704,
    "Feet/second": 0.3048,
};

export default function UnitConverterPage() {
    const [category, setCategory] = useState<Category>("Length");
    const [fromUnit, setFromUnit] = useState("Meters");
    const [toUnit, setToUnit] = useState("Kilometers");
    const [value, setValue] = useState("1");
    const [result, setResult] = useState("");

    const handleCategoryChange = (newCategory: Category) => {
        setCategory(newCategory);

        const categoryUnits = units[newCategory];
        setFromUnit(categoryUnits[0]);
        setToUnit(categoryUnits[1]);
        setResult("");
    };

    const convertTemperature = (
        amount: number,
        from: string,
        to: string
    ) => {
        let celsius = amount;

        if (from === "Fahrenheit") {
            celsius = (amount - 32) * (5 / 9);
        } else if (from === "Kelvin") {
            celsius = amount - 273.15;
        }

        if (to === "Fahrenheit") {
            return celsius * (9 / 5) + 32;
        }

        if (to === "Kelvin") {
            return celsius + 273.15;
        }

        return celsius;
    };

    const convert = () => {
        const amount = Number(value);

        if (!Number.isFinite(amount)) {
            setResult("Please enter a valid number.");
            return;
        }

        let converted: number;

        if (category === "Temperature") {
            converted = convertTemperature(amount, fromUnit, toUnit);
        } else {
            const baseValue = amount * factors[fromUnit];
            converted = baseValue / factors[toUnit];
        }

        setResult(
            `${amount} ${fromUnit} = ${Number(converted.toFixed(10))} ${toUnit}`
        );
    };

    const swapUnits = () => {
        const oldFrom = fromUnit;
        setFromUnit(toUnit);
        setToUnit(oldFrom);
        setResult("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Unit Converter
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Quickly convert between common units.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value as Category)
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                    >
                        {Object.keys(units).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <div className="mt-6">
                        <label className="mb-2 block font-medium text-gray-900">
                            Value
                        </label>

                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                        />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                From
                            </label>

                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                            >
                                {units[category].map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={swapUnits}
                            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            ⇄
                        </button>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                To
                            </label>

                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                            >
                                {units[category].map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={convert}
                        className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Convert
                    </button>

                    {result && (
                        <div className="mt-6 rounded-xl bg-gray-100 p-5 text-center">
                            <p className="text-xl font-bold text-gray-900">
                                {result}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}