class View{
    
    constructor(){
        this.clock = document.getElementById("clockTime");
        this.tbodyPCB = document.getElementById("processTableBody");
        this.terminateTable = document.getElementById("terminateTable");
        this.IoqueueTable = document.getElementById("ioQueueTable")
        this.Queue1 = document.getElementById("ReadyQueue1");
        this.Queue2 = document.getElementById("ReadyQueue2");
        this.Queue3 = document.getElementById("ReadyQueue3");
        this.memoryUSE = document.getElementById("memoryUse");
    }

    startClock(time){
        this.clock.innerHTML = time;
    }

    

    updateMemoryUSE(mem){
        this.memoryUSE.innerHTML = "Memory Use : "+mem+" %";
    }

    updateProcessTable(Allprocess){
        this.tbodyPCB.innerHTML ='';
        Allprocess.forEach(process => {
            let newTr = `
                <tr>
                    <td>${process.processId}</td>
                    <td class = "statusPCB">${process.status}</td>
                    <td>${process.arrivalTime}</td>
                    <td>${process.burstTime}</td>
                    <td>${process.waitingTime}</td>
                    <td>${process.ioTime}</td>
                    <td>${process.resPond}</td>
                    <td>${process.memory}</td> 
                    <td>${process.queuePosition}</td>  
                </tr>
            `;
            this.tbodyPCB.insertAdjacentHTML('beforeend',newTr);
            
        });
    }

    updatePCBcolor(){
        const statusPCB = document.querySelectorAll(".statusPCB");
        console.log(statusPCB);
        statusPCB.forEach((p)=>{
            if(p.innerHTML === 'running'){
                p.style.backgroundColor = "green";
            }else if(p.innerHTML === 'ready'){
                p.style.backgroundColor = "yellow";
            }else if(p.innerHTML === 'waiting'){
                p.style.backgroundColor = "coral";
            }else if(p.innerHTML === 'terminate'){
                p.style.backgroundColor = "red";
                p.style.color = 'white';
            }
        });
    }

    updateIOcolor(){
        const statusIO = document.querySelectorAll(".statusIO");
        console.log(statusIO);
        statusIO.forEach((p)=>{
            if(p.innerHTML === 'running'){
                console.log(p);
                p.style.backgroundColor = "green";
            }else if(p.innerHTML === 'waiting'){
                p.style.backgroundColor = "coral";
            }else{
                console.log("yyy");
            }
        });
    }


    updateReadyQueue1Table(Queue1){
        this.Queue1.innerHTML ='';
        Queue1.forEach(process => {
            let newTr = `
                <tr>
                    <td>${process.processId}</td>
                </tr>
            `;
            this.Queue1.insertAdjacentHTML('beforeend',newTr);
            
        });
    }

    updateReadyQueue2Table(Queue2){
        this.Queue2.innerHTML ='';
        Queue2.forEach(process => {
            let newTr = `
                <tr>
                    <td>${process.processId}</td>
                </tr>
            `;
            this.Queue2.insertAdjacentHTML('beforeend',newTr);
            
        });
    }

    updateReadyQueue3Table(Queue3){
        this.Queue3.innerHTML ='';
        Queue3.forEach(process => {
            let newTr = `
                <tr>
                    <td>${process.processId}</td>
                </tr>
            `;
            this.Queue3.insertAdjacentHTML('beforeend',newTr);
            
        });
    }

    updateIOqueue(deviceQueue){
        this.IoqueueTable.innerHTML ='';
        deviceQueue.forEach(process => {
            let newTr = `
                <tr>
                    <td>${process.processId}</td>
                    <td class = "statusIO">${process.statusIO}</td>  
                </tr>
            `;
        this.IoqueueTable.insertAdjacentHTML('beforeend',newTr);
        console.log(this.IoqueueTable);
        });
        this.updateIOcolor();
        

    }

    updateTerminate(process){
        
        let TAT = process.burstTime + process.waitingTime + process.ioTime + process.resPond;
        let newTr = `
                <tr>
                    <td>${process.processId}</td>
                    <td class = "statusPCB">${process.status}</td>
                    <td>${process.arrivalTime}</td>
                    <td>${process.burstTime}</td>
                    <td>${process.waitingTime}</td>
                    <td>${process.ioTime}</td>
                    <td>${process.resPond}</td>
                    <td>${TAT}</td>  
                </tr>
            `;
        this.terminateTable.insertAdjacentHTML('beforeend',newTr);
    }
}
export default View;