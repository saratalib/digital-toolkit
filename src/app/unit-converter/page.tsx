"use client";

import { useState } from "react";

type Category =
    | "Length"
    | "Weight"
    | "Temperature"
    | "Area"
    | "Volume"
    | "Speed";

const units: Record<Category, string[]> = {
    Length: [
        "Meters",
        "Kilometers",
        "Centimeters",
        "Millimeters",
        "Miles",
        "Yards",
        "Feet",
        "Inches",
    ],
    Weight: [
        "Kilograms",
        "Grams",
        "Milligrams",
        "Pounds",
        "Ounces",
    ],
    Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    Area: [
        "Square Meters",
        "Square Kilometers",
        "Square Feet",
        "Square Yards",
        "Acres",
    ],
    Volume: [
        "Liters",
        "Milliliters",
        "Cubic Meters",
        "Gallons",
        "Cups",
    ],
    Speed: [
        "Meters/second",
        "Kilometers/hour",
        "Miles/hour",
        "Feet/second",
    ],
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
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <a
                        href="/"
                        className="text-xl font-bold tracking-tight"
                    >
                        DigitalKit
                    </a>

                    <a
                        href="/"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Back to Tools
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-4xl px-6 py-14 sm:py-16">
                <div className="text-center">
                    <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                        📏 Free Online Unit Converter
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Unit Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Convert length, weight, temperature, area, volume,
                        and speed instantly with a simple free unit converter.
                    </p>
                </div>

                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <label className="mb-2 block font-semibold">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value as Category)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        {Object.keys(units).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold">
                            Value
                        </label>

                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                        />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
                        <div>
                            <label className="mb-2 block font-semibold">
                                From
                            </label>

                            <select
                                value={fromUnit}
                                onChange={(e) =>
                                    setFromUnit(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                            >
                                {units[category].map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={swapUnits}
                            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
                            aria-label="Swap units"
                        >
                            ⇄
                        </button>

                        <div>
                            <label className="mb-2 block font-semibold">
                                To
                            </label>

                            <select
                                value={toUnit}
                                onChange={(e) =>
                                    setToUnit(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
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
                        type="button"
                        onClick={convert}
                        className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
                    >
                        Convert
                    </button>

                    {result && (
                        <div className="mt-6 rounded-xl bg-slate-100 p-5 text-center">
                            <p className="text-xl font-bold">
                                {result}
                            </p>
                        </div>
                    )}
                </div>

                <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
                    <h2 className="text-2xl font-bold">
                        Free Online Unit Conversion
                    </h2>

                    <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
                        <p>
                            DigitalKit's unit converter makes it easy to
                            convert measurements between commonly used units.
                            Whether you need to convert meters to kilometers,
                            kilograms to pounds, Celsius to Fahrenheit, or
                            liters to gallons, you can get the result directly
                            in your browser.
                        </p>

                        <p>
                            The converter supports several categories,
                            including length, weight, temperature, area,
                            volume, and speed. Choose a category, enter your
                            value, select the units you want to convert
                            between, and press Convert.
                        </p>

                        <p>
                            The conversion happens directly in your browser,
                            making the tool quick and convenient for everyday
                            calculations, schoolwork, business tasks, travel,
                            engineering, and general measurement conversions.
                        </p>
                    </div>

                    <h2 className="mt-10 text-2xl font-bold">
                        How to Use the Unit Converter
                    </h2>

                    <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                        <li>
                            <strong>1. Choose a category:</strong> Select
                            length, weight, temperature, area, volume, or
                            speed.
                        </li>
                        <li>
                            <strong>2. Enter a value:</strong> Type the number
                            you want to convert.
                        </li>
                        <li>
                            <strong>3. Select your units:</strong> Choose the
                            starting unit and the unit you want to convert to.
                        </li>
                        <li>
                            <strong>4. Convert:</strong> Click the Convert
                            button to see the result.
                        </li>
                    </ol>

                    <h2 className="mt-10 text-2xl font-bold">
                        Related DigitalKit Tools
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                        <a
                            href="/percentage-calculator"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Percentage Calculator →
                        </a>

                        <a
                            href="/profit"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Profit & Pricing Calculator →
                        </a>

                        <a
                            href="/tip-calculator"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Tip Calculator →
                        </a>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold">
                        Unit Converter FAQ
                    </h2>

                    <div className="mt-5 space-y-4">
                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                What units can I convert?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                You can convert common units for length,
                                weight, temperature, area, volume, and speed.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                Can I convert Celsius to Fahrenheit?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Yes. The temperature converter supports
                                Celsius, Fahrenheit, and Kelvin conversions.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                Is this unit converter free?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Yes. DigitalKit's unit converter is free to
                                use directly in your web browser.
                            </p>
                        </details>
                    </div>
                </section>
            </section>
        </main>
    );
}