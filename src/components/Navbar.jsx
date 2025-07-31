export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-10 bg-beige-200 backdrop-blur-md">
            <div className="flex px-4 md:px-8 py-4 h-20 justify-between items-center">
                <section>
                    <p className="text-brown-700 text-2xl md:text-4xl font-bold">LeftoverChef</p>
                </section>
                <section className="cursor-pointer w-8 md:w-9 h-8 md:h-9">
                    <img src="./src/assets/images/icons/user-profile-black.svg" alt="icon user profile"/>
                </section>
            </div>
        </nav>
    )
}