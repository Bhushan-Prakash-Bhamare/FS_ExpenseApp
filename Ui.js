const exForm=document.getElementById('expform');
const displayList=document.querySelector('.list-group');
exForm.addEventListener('submit',formSubmit);


function formSubmit(e)
{   
    e.preventDefault();
    const amount=document.getElementById('expamt').value;
    const description=document.getElementById('desc').value;
    const category=document.getElementById('sel-list').value;
    let myobj={
      amount,description,category
    }
    axios
      .post("http://localhost:3100/add-expense",myobj)
      .then(response=>{
        console.log(response);
        showUser(response.data.newExpenseData);
      })
      .catch(err=>{
        document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"    
        console.log(err)});

    
}

window.addEventListener("DOMContentLoaded",()=>{
    axios
        .get("http://localhost:3100")
        .then((response)=>{
            for(var i=0;i<response.data.expenseData.length;i++)
              showUser(response.data.expenseData[i]);
        })
        .catch((error)=>console.log(error));
})

function showUser(myobj)
{
    const addNewelem=document.createElement('li');
    addNewelem.className="list-group-item bg-light";
    const text=document.createTextNode(myobj.amount+"-"+myobj.description+"-"+myobj.category);
    addNewelem.appendChild(text);

    const deletebtn=document.createElement('button');
    deletebtn.className='btn btn-danger btn-sm float-end delete'
    deletebtn.appendChild(document.createTextNode('Delete'));
    addNewelem.appendChild(deletebtn);

    const editbtn=document.createElement('button');
    editbtn.className='btn btn-warning btn-sm float-end edit'
    editbtn.appendChild(document.createTextNode('Edit'));
    addNewelem.appendChild(editbtn);

    displayList.appendChild(addNewelem);

    deletebtn.addEventListener('click',function(){
        const dId=myobj.id;
          axios
            .delete(`http://localhost:3100/delete-expense/${dId}`)
            .then(()=>{
                displayList.removeChild(addNewelem);
            })
            .catch((err)=>console.log(err));
           
      })

    editbtn.addEventListener('click',function(){
        document.getElementById('expamt').value=myobj.amount;
        document.getElementById('desc').value=myobj.description;
        document.getElementById('sel-list').value=myobj.category;
        const dId=myobj.id;
      axios
      .delete(`http://localhost:3100/delete-expense/${dId}`)
      .then(()=>{
        displayList.removeChild(addNewelem);
      })
      .catch((err)=>console.log(err));
    })
}