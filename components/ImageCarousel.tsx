import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useState } from "react"
// @ts-ignore
import Slider from 'react-slick'
import {
    Box,
    IconButton,
    useBreakpointValue,
    Image,
    useRadio,
    chakra
} from "@chakra-ui/react";

// WARNING------------------
// I USE THIS FOR BOTH THE OUTFITS CAROUSELS AND POST CAROUSELS

// These are the normalized box sizes for profile/outfit carousel
const box = [105, 125, 206, 300, 300]

const ImageCarousel = (
    {
        _id,
        topImage,
        bottomImage,
        footwearImage = null,
        postImage,
        width = box,
        height = box,
        autoplay = true,
        radio = true,
        // needs to be at the bottom
        ...radioProps
    }: any
) => {
    const [slider, setSlider] = useState<Slider | null>(null);
    const topSide = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps)

    const settings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        autoplay: autoplay,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // Handle outfit deletion at the top level
    // const [deleteOutfit] = useMutation(DELETE_OUTFIT, {
    //     update(cache, { data: { deleteOutfit: { outfits } } }) {
    //         //retrieve cached query value from memory
    //         const { findMe }: any = cache.readQuery({
    //             query: FIND_FITS
    //         })
    //         cache.writeQuery({
    //             query: FIND_FITS,
    //             data: {
    //                 findMe: {
    //                     ...findMe,
    //                     outfits: outfits,
    //                 }
    //             }
    //         })
    //     }
    // })

    // const handleOutfitDelete = (e: any) => {
    //     const outfitId = e.currentTarget.dataset.id
    //     deleteOutfit({ variables: { outfitId } })
    // }

    return (
        <chakra.label {...htmlProps} cursor='pointer'>
            {radio &&
                <input
                    {...getInputProps({})}
                    hidden />
            }
            <Box
                key={_id + 10724}
                h={height}
                w={width}
                cursor="pointer"
                overflow={'hidden'}
                position="relative"
                {...getCheckboxProps()}
                opacity={state.isChecked ? '70%' : '100%'}
                {...getLabelProps()}
            >
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                {/* DELETE MENU */}
                {/* <Menu placement="bottom-start">
                    <MenuButton
                        border="none"
                        as={IconButton}
                        aria-label='Options'
                        icon={<BiDotsHorizontalRounded />}
                        variant='outline'
                        position="absolute"
                        zIndex={20}
                        left={0}
                        boxSize="17.5px"
                    />
                    <MenuList display="flex" h={10}>
                        <MenuItem
                            command='⌘T'
                            data-id={_id}
                            onClick={(e) => handleOutfitDelete(e)}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu> */}
                {/* Left Icon */}
                <IconButton
                    aria-label="left-arrow"
                    variant="ghost"
                    position="absolute"
                    left={side}
                    top={topSide}
                    transform={'translate(-150%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}
                    size="xs"
                    borderRadius="full"
                >
                    <BiLeftArrowAlt size="17.5px" />
                </IconButton>
                {/* Right Icon */}
                <IconButton
                    aria-label="right-arrow"
                    variant="ghost"
                    position="absolute"
                    right={side}
                    top={topSide}
                    transform={'translate(150%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickNext()}
                    size="xs"
                    borderRadius="full"
                >
                    <BiRightArrowAlt size="17.5px" />
                </IconButton>
                {/* Slider */}
                <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                    {postImage ?
                        <Image
                            h={height}
                            w={width}
                            key={_id + 512}
                            position="relative"
                            alt="Picture of top"
                            objectFit="cover"
                            src={postImage}
                        />
                        :
                        null
                    }
                    <Image
                        h={height}
                        w={width}
                        key={_id + 512}
                        position="relative"
                        alt="Picture of top"
                        objectFit="cover"
                        src={topImage}
                    />
                    <Image
                        h={height}
                        w={width}
                        key={_id + 512}
                        position="relative"
                        alt="Picture of bottom"
                        objectFit="cover"
                        src={bottomImage}
                    />
                    {footwearImage ?
                        <Image
                            h={height}
                            w={width}
                            key={_id + 512}
                            position="relative"
                            alt="Picture of footwear"
                            objectFit="cover"
                            src={footwearImage}
                        />
                        :
                        null
                    }

                </Slider>
            </Box>
        </chakra.label>
    )
}

export default ImageCarousel
