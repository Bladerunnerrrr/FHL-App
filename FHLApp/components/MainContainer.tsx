import { SafeAreaView } from "react-native-safe-area-context";
function MainContainer({children}){
    return(
        <SafeAreaView className="flex-1 pt-[20px] bg-[#201520]">
            {children}
        </SafeAreaView>
    );
};

export default MainContainer;