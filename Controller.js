import Model from './Model.js';
import View from './View.js';

class Controller{

    constructor(model,view){
        this.model = model;
        this.view = view;
        this.startClock();
    }
    startClock(){
        setInterval(()=>{
            this.model.updateTime(); // time ++
            this.view.startClock(this.model.time);
            this.view.updateProcessTable(this.model.getAllprocess());
            this.model.checkBursttime();
            this.view.updatePCBcolor();
            this.view.updateIOqueue(this.model.getDeviceQueue());
            this.view.updateReadyQueue1Table(this.model.getReadyQueue1());
            this.view.updateReadyQueue2Table(this.model.getReadyQueue2());
            this.view.updateReadyQueue3Table(this.model.getReadyQueue3());
            this.view.updateMemoryUSE(this.model.getMemory());
            

            
        },1000);
    }  

    addProcess_Con(){
        
        this.model.AddPCB();
        this.model.startProcessTime();       
        this.model.findRunningProcess();
    }

    terminate_Con(){
        let terminate = this.model.terminate();
        if(terminate){
            this.view.updateTerminate(terminate);
        }
        
    }

    addIOdevice_Con(){
        this.model.addIOdevice();
        
    }

    removeIOdevice_Con(){
        this.model.removeIodevice();    
    }

}

const model = new Model();
const view = new View();
const myControl = new Controller(model,view);


const addProcess = document.getElementById('addProcess');
addProcess.addEventListener('click',()=>{
    myControl.addProcess_Con();
});

const terminate = document.getElementById('terminate');
terminate.addEventListener('click',()=>{
    myControl.terminate_Con();
});

const addio = document.getElementById('addio');
addio.addEventListener('click',()=>{
    myControl.addIOdevice_Con();
});

const removeio = document.getElementById('removeio');
removeio.addEventListener('click',()=>{
    myControl.removeIOdevice_Con();
});