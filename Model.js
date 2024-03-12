class Model{
    constructor(){
        this.allProcess = [];
        this.readyQueue1 = [];
        this.readyQueue2 = [];
        this.readyQueue3 = [];
        this.deviceQueue = [];
        this.time =0;
        this.intervalid = null;
        this.MEMORYSIZE = 2048;
        this.runningCPU = null;
        this.runningDevice= null;
        this.processCount = 0;
    }

    startProcessTime(){
        if(!this.intervalid){
            this.intervalid = setInterval(()=>{
                let process = this.allProcess;
                process.forEach((p)=>{
                    if(p.status === 'running'){
                        p.burstTime++;
                    }else if(p.status === 'ready'){
                        p.waitingTime++;
                    }else if(p.statusIO === 'running'){
                        p.ioTime++;
                    }else if(p.statusIO === 'waiting' && this.deviceQueue.length != 0){
                        p.resPond++;
                    }
                });
            },1000);
        }
    }

    checkBursttime(){
        if(this.readyQueue1.length !=0){
            let runningProcess = this.readyQueue1.find(p=>p.status === 'running');
            let running = this.allProcess.find(p=>p.status === 'running');
            if(runningProcess){
                if(runningProcess.burstTime >= 3){
                    let q1 = this.readyQueue1.shift();
                    q1.status = 'ready';
                    this.readyQueue2.push(q1);
                    this.findRunningProcess();
                }else{
                    
                }
            }else if(running){
                running.status = 'ready';
                this.readyQueue1[0].status = 'running';
            }

        }else if(this.readyQueue1.length ==0 && this.readyQueue2.length !=0){
            let runningProcess = this.readyQueue2.find(p=>p.status === 'running');
            if(runningProcess){
                if(runningProcess.burstTime >= 5){
                    let q2 = this.readyQueue2.shift();
                    q2.status = 'ready';
                    this.readyQueue3.push(q2);
                    this.findRunningProcess();
                }
            }else{
                if(this.readyQueue2.length !=0 && this.readyQueue2[0].status !='waiting'){
                    this.readyQueue2[0].status = 'running';
                }
            }
        }else if(this.readyQueue1.length ==0 && this.readyQueue2.length ==0){
            if(this.readyQueue3.length !=0 && this.readyQueue3[0].status !='waiting'){
                this.readyQueue3[0].status = 'running';
                console.log(this.readyQueue3[0]);
            }
            
        }
    }

    findRunningProcess(){
        let runningProcess = this.allProcess.find(p=>p.status === 'running');
        if(runningProcess){
            
        }else{
            for(let i=0; i<this.allProcess.length;i++) {
                if(this.readyQueue1.length !=0 && this.readyQueue1[i].status !='waiting'){
                    this.readyQueue1[i].status = 'running';
                    break;
                }else if(this.readyQueue2.length !=0 && this.readyQueue2[i].status !='waiting'){
                    this.readyQueue2[i].status = 'running';
                    break;
                }else if(this.readyQueue3.length !=0 && this.readyQueue3[i].status !='waiting'){
                    this.readyQueue3[i].status = 'running';
                    break;
                }
            };
        }
    }

    findIoRunning(){
        if(this.deviceQueue.length !=0){
            let runningIO = this.deviceQueue.find(p=>p.statusIO === 'running');
            if(runningIO){

            }else{
                this.deviceQueue[0].statusIO = 'running';
            }
        } 
    }

    AddPCB(){
        this.processCount++;
        const process = {
            processId:this.processCount,
            status:'new',
            arrivalTime:this.time,
            burstTime:0,
            waitingTime:0,
            ioTime:0,
            resPond:0,
            memory:Math.floor(Math.random() * 512) + 1,  
            statusIO:'waiting',
            queuePosition:1
        }

        let lastMem = process.memory;
        if(this.checkMemory(lastMem)){
            this.allProcess.push(process);
            
            this.readyQueue1.push(process);
            this.readyQueue1.forEach(process => {
                process.status = 'ready';
            });
        }else{
            alert("Memory ไม่เพียงพอ");
        }
    }

    terminate(){

        let runningProcess = this.allProcess.find(p=>p.status === 'running');
        let index = this.allProcess.findIndex(p=>p == runningProcess);
        let removeProcess;
        if(runningProcess){
            if(this.readyQueue1.length !=0){
                removeProcess = this.readyQueue1.shift();
            }else if(this.readyQueue2.length !=0){
                removeProcess = this.readyQueue2.shift();
            }else if(this.readyQueue3.length != 0){
                removeProcess = this.readyQueue3.shift();
            }
        }else{
            alert("ไม่มี process ที่ running อยู่")
        }
        if(this.allProcess.length != 0 && removeProcess){
            
            removeProcess.status = 'terminate';
            this.allProcess.splice(index,1);
            this.findRunningProcess();
            return removeProcess;
        }
        
    }

    addIOdevice(){
        let runningProcess = this.allProcess.find(p=>p.status === 'running');
        
        if(runningProcess){
            runningProcess.status = 'waiting';
            if(this.readyQueue1.length !=0){
                this.deviceQueue.push(this.readyQueue1.shift());
            }else if(this.readyQueue2.length !=0){
                this.deviceQueue.push(this.readyQueue2.shift());
            }else if(this.readyQueue3.length != 0){
                this.deviceQueue.push(this.readyQueue3.shift());
            }
            console.log(this.deviceQueue);
            this.findRunningProcess();
        
            this.findIoRunning();
        }else{
            alert("ไม่มี process");
        }
        
    }

    removeIodevice(){

        if(this.deviceQueue.length !=0){
            this.deviceQueue[0].status = 'ready';
            this.deviceQueue[0].statusIO = 'waiting';
            if(this.deviceQueue[0].burstTime <3){
                this.readyQueue1.push(this.deviceQueue.shift());
            }else if(this.deviceQueue[0].burstTime >=3 && this.deviceQueue[0].burstTime <5){
                this.readyQueue2.push(this.deviceQueue.shift());
            }else if(this.deviceQueue[0].burstTime >= 5){
                this.readyQueue3.push(this.deviceQueue.shift());
            } 
            this.findRunningProcess();
            this.findIoRunning();
       }else{
            alert("ไม่มีการใช้งาน IO ");
       }
    }

    getAllprocess(){
        return this.allProcess;
    }

    getDeviceQueue(){
        return this.deviceQueue;
    }

    getReadyQueue1(){
        return this.readyQueue1;
    }

    getReadyQueue2(){
        return this.readyQueue2;
    }

    getReadyQueue3(){
        return this.readyQueue3;
    }

    getMemory(){
        let memory = 0;
        this.allProcess.forEach((p)=>{
            memory += p.memory
        });
        return ((memory/this.MEMORYSIZE)*100).toFixed(2);
    }

    checkMemory(LastMemory){
        let memory = 0;
        this.allProcess.forEach((p)=>{
            memory += p.memory
        });
        memory += LastMemory;
        if(memory < this.MEMORYSIZE){
            return true;
        }else{
            return false;
        }
    }

    updateTime(){
        this.time++;
    }
}
export default Model;