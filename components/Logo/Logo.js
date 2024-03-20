import Image from "next/image";

export const Logo = () => {
    return(
        <div className="text-3xl text-center py-4 font-heading">
            AutoBlog
            <div className="inline-block align-middle">
                <Image
                    src='/favicon.png'
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </div>
        </div>
    );
}