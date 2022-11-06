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

//counts number of group objects, by default there is one
//reqs stated a maximum of 16, int value
number_of_group_objects = 1;

//bool for marking a task as completed
completed_bool = 0;

//another comment
//default types list, implimentation may change in the future
//hard coded value for types
let types_array = [
    "Assignment",
    "Test",
    "Lab",
    "Exam"
]

//default group object implimentation may change in the future to JSON object 
//default objects we are currently using to represent a default group object
let default_group_object = {
    name: 'default',
    colour: 'black' //maybe use a different value later
}

//function used to create a new group
//this is just a basic code skeleton to get started
function create_new_group() {
    //check to see if value exceeds max value, exit function
    if(number_of_group_objects > 15){
        console.log("Maximum number of group objects created, cannot create more group objects");
        break create_new_group;
    }
    console.log('Enter the name of the new group');
    //basic input, error checking later
    console.log('What colour would you like the group to be');
    //basic input, error checking later
}


//function used to create a new task
//this is just a basic code skeleton to get started
//the implementation will change as it uses firebase and the input changes
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