import { React, useState} from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAltTwoTone';
import { Header,AppNameComponent,AppIcon,SearchComponent,SearchIcon,SearchInput } from './components/headerComponenet';



const RecipeContainer=styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:300px;
box-shadow:0 3px 10px 0 #aaa`;

const CoverImage=styled.img`
height:200px;
object-fit:cover;`;

const RecipeName=styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:10px 0;
text-align:center;
white-space:nowrap;
overflow: hidden;
text-overflow: ellipsis;`;

const SeeMoreText=styled.span`
color:#eb3300;
border:solid 1px #eb3300;
font-size: 18px;
text-align: center;
border-radius: 3px;
padding: 10px 15px;
cursor: pointer;`;

const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;

const Container=styled.div`
display:flex;
flex-direction:column;
`;
const ReciepeListContainer=styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding30px;
gap:20px;
justify-content:space-evenly;`;





function App() {
    const [searchQuery, updateSearchQuery] = useState("");
    const [timeoutId,updateTimeoutId]=useState();
    const [recipeList,updateRecipeList]=useState([]);
    const fetchReciepe = async (searchString)=>{
    const response= await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits)
    };

  const onTextChange = (event) =>{
    clearTimeout(timeoutId)
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(() => fetchReciepe(event.target.value),500);
    updateTimeoutId(timeout);
  };


  const RecipeComponent = (props) => {

    const [show, setShow] = useState("");
  
    const { label, image, ingredients, url } = props.recipe;
    return (
      
      <RecipeContainer>
        <Dialog
          onClose={() => console.log("adsadad")}
          aria-labelledby="simple-dialog-title"
          open={!!show}
        >
          <DialogTitle>Ingredients</DialogTitle>
          <DialogContent>
            <RecipeName>{label}</RecipeName>
            <table>
              <thead>
                <th>Ingredient</th>
                <th>Weight</th>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index} className="ingredient-list">
                    <td>{ingredient.text}</td>
                    <td>{ingredient.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
            <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
          </DialogActions>
        </Dialog>
        <CoverImage src={image} alt={label} />
        <RecipeName>{label}</RecipeName> 

       
   
       <SaveAltTwoToneIcon />
      

        <IngredientsText onClick={() => setShow(!show)}>
          Ingredients
        </IngredientsText>
       
        <SeeMoreText onClick={() => window.open(url)}>
          See Complete Recipe
        </SeeMoreText>
      </RecipeContainer>
    
      
    );
  };
  
  
  const Placeholder = styled.img`
    width: 120px;
    height: 120px;
    margin: 200px;
    opacity: 50%;
  `;
  
  const APP_KEY="e009e9c8451dc59f9ac285843557e586";
  const APP_ID="8e1d2940";


  return (
    
    <Container>
      <Header>
        <AppNameComponent><AppIcon src="/hamburger.svg" />Find Food Recipe</AppNameComponent>
        <SearchComponent>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder='made by Namrata' value={searchQuery} onChange={onTextChange} />
        </SearchComponent>
      </Header>
      <ReciepeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/hamburger.svg" />
        )}
      </ReciepeListContainer>
    </Container>
   
  
  );
}


export default App;
