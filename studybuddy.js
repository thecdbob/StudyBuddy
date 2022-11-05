console.log("Testing Github Pages Hosting");
function myFunction() {
    alert("Hello! I am an alert box!");
}

//normally I would put this all the top, but every above this is currently serving some purpose for now, we will change this structure as time moves on

//variables

//placeholder login info value
let login_process_bool = false;
//maybe this is dictionaries
let place_holder_task_array;

//group input object
let input_selected_colour = null;
let input_group_colour = null;


//default types list, implimentation may change in the future
let types_array = [
    "Assignment",
    "Test",
    "Lab",
    "Exam"
]

//default group object implimentation may change in the future to JSON object 
let default_group_object = {
    name: 'default',
    colour: 'black' //maybe use a different value later
}

//this is just a basic code skeleton to get started
function create_new_group() {
    console.log('Enter the name of the new group');
    //basic input, error checking later
    console.log('What colour would you like the group to be');
    //basic input, error checking later
}

//this is just a basic code skeleton to get started
function create_new_task() {
    console.log('Enter the name of the new task');
    //basic input, error checking later
    console.log('What group is the task in?');
    //list of task, maybe ability to create new task later
    console.log("What Type of task is this");
    //list array of types
    console.log("when is this task due?");   
    //this is probably something to fix last, data/time will not be that easy
}