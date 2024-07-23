import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";


const ColorModeSwitch = () => {

const {toggleColorMode,colorMode} = useColorMode();

  return (
    <>
    <HStack justifyContent={"end"} m={5}>
        <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
       {colorMode === 'dark' ? <Text whiteSpace={'nowrap'}><MoonIcon onClick={toggleColorMode}/></Text> : <Text whiteSpace={'nowrap'}><SunIcon/></Text>}
    </HStack>
        
    </>
  )
}

export default ColorModeSwitch