import {createTheme, styled, ThemeProvider} from '@mui/material';
import {rgba, tint, shade, invert, meetsContrastGuidelines} from 'polished';
import {ImageListItem, ImageListItemBar, Grid} from '@mui/material';
import {motion} from 'framer-motion';
import { usePalette } from 'react-palette';
import {usePoke} from '../../store/pokedex.store';

const ImgWrapper = styled('span')`
  img {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;

    /* Safari seems to support, but seems deprecated and does the same thing as the others. */
    image-rendering: -webkit-optimize-contrast;
  }
`

const CardImg = styled('img')`
  transform: scale(var(--scale));
  transition: all 0.2s ease-out;
  margin: 0px auto!important;
  text-align: center;
  //background-color: ${props => props.theme.palette.primary.main};
  width: 100%;
  height: auto;
`
const CardContainer = styled(motion.div)`
  background-color: ${props => props.theme.palette.primary.main};
  line-height:0;
  cursor: pointer; 
  padding: 2em;
`

const CardText = styled(ImageListItemBar)`
  background-color: ${props => props.theme.palette.primary.main};
  .MuiImageListItemBar-title {
    color: ${props => props.theme.palette.primary.contrastText};
    p {
      margin: var(--textMargin);
      transition: all 0.2s ease-out;   
    }
    span {
      font-weight: 600;
    } 
  }
`;

export default function Card({ item }: any) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.indexNum}.png`;
  const [state, actions] = usePoke();
  const { data, loading, error } = usePalette(imageUrl);

  let bgColor = shade(0.025, `${rgba(`${loading || error ? '#eeeeee' : data.lightMuted}`, 0.80)}`);
  let textColor = invert(`${rgba(`${loading || error ? '#000000' : data.vibrant}`, 1)}`);
  // let bgColor = '#eeeeee';
  // let textColor = '#000000';
  // Check if the title colour is properly contrasted with the background
  // If not, mix the colour with white
  if(!meetsContrastGuidelines(bgColor, textColor).AA) {
    textColor = `${tint(0.80, `${rgba(`${loading || error ? '#eeeeee' : data.lightMuted}`, 1)}`)}`
  }

  const theme = createTheme( {
    palette: {
      primary: {
        main: bgColor,
        contrastText: textColor,
      }
    }
  });

  // Set up animations with framer motion
  // to pass animations to children we use a css variable name '--example'
  const cardAnimations = {
    initialAnim: {'--textMargin': '2px 0', '--scale': 1, opacity: 0.2},
    anim: {opacity: 1},
    transitionAnim: {
      opacityAnim: ({ opacity: { delay: 0.2 + (parseInt(`0.${item.indexNum}5`) * 3), duration: 0.4 }})
    },
    hoverAnim: {
      '--scale': 1.05,
      '--textMargin': '10px 0',
      transition: {duration: 0.2, ease: 'easeInOut'}
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ImageListItem onClick={() => actions.addPokemon(item)}>
        <Grid item>
          {/*<Link href={`/${item.user.username}`}>*/}
          <CardContainer as={motion.div}
                         whileHover={cardAnimations.hoverAnim}
                         initial={cardAnimations.initialAnim}
                         animate={cardAnimations.anim}
                         transition={cardAnimations.transitionAnim.opacityAnim}
          >
            <ImgWrapper>
              <img width={200} height={200} src={imageUrl} alt={item.name} placeholder={'blur'} />
            </ImgWrapper>
            {/*<img width={100} height={100} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.indexNum}.png`} />*/}

            <CardText
              title={<p><span>#{item.id}: </span>{item.name}</p>}
            >
            </CardText>
          </CardContainer>
          {/*</Link>*/}
        </Grid>

      </ImageListItem>
    </ThemeProvider>
  );
}
