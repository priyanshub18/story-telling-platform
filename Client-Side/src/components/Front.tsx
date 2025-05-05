const Front = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 p-10">
            <div className="flex justify-center w-full">
                <img
                    src="https://i.pinimg.com/736x/ef/5e/49/ef5e49deeb47a94a5133ae1c1b4d2830.jpg"
                    alt="Reading"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    width={450}
                    height={300}
                />
            </div>
            <div className="flex justify-center w-full">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-center md:text-left leading-snug">
                    Always <br /> keep <br /> Reading
                </h1>
            </div>
        </div>
    );
};

export default Front;