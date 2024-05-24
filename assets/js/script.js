const list = document.querySelector('.tabnav-items'); // Get the list container
const listItems = list.querySelectorAll('li'); // Get all list items
const totalListItems = listItems.length;
const itemContainer = document.querySelector('.item-container');
const captionsGallery = document.querySelector('.captions-gallery');
const captionsGallery_item = captionsGallery.querySelectorAll('.gallery-caption');
const itemContainer_width = itemContainer.offsetWidth;
const itemContainer_item = itemContainer.querySelectorAll('.item');
const tabNav_left = document.querySelector('.tabnav-paddle-left');
const tabNav_right = document.querySelector('.tabnav-paddle-right');

function defaultState() {
  itemContainer_item.forEach((item, index) =>{
    const newTranslateX =  index * itemContainer_width;
    item.style.transform = `translate(${newTranslateX}px, 0px)`;
  })
}

function resetState(){

  list.querySelectorAll(".current").forEach(curr=>{
    curr.classList.remove("current");
  })

  itemContainer.querySelectorAll('.current').forEach(ii=>{
    ii.classList.remove('current');
  })

  captionsGallery.querySelectorAll('.current').forEach(ii=>{
    ii.classList.remove('current');
  })
}

function executeCurrentState(item, index){
  const itemWidth = item.offsetWidth;
  const listWidth = list.offsetWidth;
  const itemLeftOffset = item.offsetLeft;
  const scrollLeft = itemLeftOffset - (listWidth / 2) + (itemWidth / 2);
  resetState();

  item.classList.add("current");
  item.querySelector('button').classList.add("current");

  list.scrollTo({
    left: scrollLeft,
    behavior: 'smooth' // Enable smooth scrolling
  });

  itemContainer_item[index].classList.add('current')
  captionsGallery_item[index].classList.add('current')
  
  if (itemContainer) {
    // Calculate new translateX
    const newTranslateX =  index * itemContainer_width;
    // Update transform style
    itemContainer.style.transform = `translate3d(-${newTranslateX}px, 0px, 0px)`;
  }

  if(index < 1){
    tabNav_left.disabled = true;
  }else{
    tabNav_left.disabled = false;
  }

  if(index > (totalListItems - 2)){
    tabNav_right.disabled = true;
  }else{
    tabNav_right.disabled = false;
  }
}

function handleNavigationForward() {
    const prevItem = list.querySelector('li.current');
    const current_index = parseInt(prevItem.dataset.tab, 10);
    const index = current_index + 1;
    const item = prevItem.nextElementSibling;
    if(index < totalListItems){
      executeCurrentState(item, index);
    }
}

function handleNavigationBackward() {
    const prevItem = list.querySelector('li.current');
    const current_index = parseInt(prevItem.dataset.tab, 10);
    const index = current_index - 1;
    const item = prevItem.previousElementSibling;
    if(index > -1){
      executeCurrentState(item, index);
    }
}


// Define All the Events
// Call on window resize
window.addEventListener('resize', defaultState);
// Call on tab click
listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    executeCurrentState(item, index);
  });
});
// Call on forward arrow click
tabNav_right.addEventListener("click", handleNavigationForward);
// Call on backward arrow click
tabNav_left.addEventListener("click", handleNavigationBackward);
// Call on keyboard arrows click
document.addEventListener("keydown", (event)=>{
  if(event.key === 'ArrowLeft'){
    handleNavigationBackward();
  }else
  if(event.key === 'ArrowRight'){
    handleNavigationForward();
  }
});

// default states
defaultState();
listItems[0].click();
