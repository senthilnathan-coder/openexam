import { FaAppleAlt } from "react-icons/fa";
import { SiSamsung, SiVivo, SiNike, SiAdidas, SiDior, SiZara, 
         SiSony, SiHuawei, SiLenovo, SiToshiba, SiDell } from "react-icons/si";
import { CgChanel } from "react-icons/cg";

const logos = [
    { Icon: FaAppleAlt, size: 60 },
    { Icon: SiSamsung, size: 225 },
    { Icon: SiVivo, size: 170 },
    { Icon: SiSony, size: 185 },
    { Icon: SiHuawei, size: 70 },
    { Icon: SiNike, size: 125 },
    { Icon: SiAdidas, size: 80 },
    { Icon: SiDior, size: 120 },
    { Icon: CgChanel, size: 80 },
    { Icon: SiZara, size: 100 },
    { Icon: SiLenovo, size: 145 },
    { Icon: SiToshiba, size: 175 },
    { Icon: SiDell, size: 65 }
];

const Scrolling = () => {
    return (
        <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 ">
            {/* <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
                    Trusted by Leading Brands Worldwide
                </h2>
                <div className="relative w-full overflow-hidden">
                    <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
                        <div className="py-8 relative">
                            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 to-transparent z-10"></div>
                            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/90 to-transparent z-10"></div>
                            
                            <marquee scrollamount="10" behavior="alternate">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center space-x-20 md:space-x-24">
                                        {logos.map(({ Icon, size }, index) => (
                                            <div 
                                                key={index} 
                                                className="transform hover:scale-110 transition-transform duration-300 hover:opacity-75"
                                            >
                                                <Icon 
                                                    size={size} 
                                                    className="text-gray-700 opacity-80 hover:opacity-100" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </marquee>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Scrolling;