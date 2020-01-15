    eventListeners();
    
    function eventListeners(){
        const ui  = new UI()

        // preloader
        window.addEventListener('load', function(){
            ui.hidePreloader()
        })

        // navvar
        document.querySelector('.navBtn').addEventListener('click', function(){
            ui.showNav()
        })

        // video controls
        document.querySelector('.video__switch').addEventListener('click', function(){
            ui.videoControls()
        })

        //submit the form
        document.querySelector(".drink-form").addEventListener("submit" ,function(event){
            event.preventDefault();
            const name = document.querySelector(".input-name").value;
            const lastName = document.querySelector(".input-lastname").value;
            const email = document.querySelector(".input-email").value;
              
            let value  = ui.checkEmpty(name, lastName, email)
            // console.log(value);
            if(value){
                let customer =  new Customer(name, lastName, email)
                ui.addCustomer(customer)
                ui.showFeedback('Customer added in this list', 'success')
            }
            else{
                ui.showFeedback('Some Form values empty', 'error')
            }

        })

        // display modal
        const links = document.querySelectorAll(".work-item__icon");
        links.forEach(function(item){
            item.addEventListener('click', function(event){
                ui.showModal(event) 
            })
        }) 

        document.querySelector(".work-modal__close").addEventListener('click', function(){
            ui.closeModal()
        })


    }


    function UI(){

    }
    // for Preloader
    UI.prototype.hidePreloader = function (){

        document.querySelector('.preloader').style.display = "none";
        
    }
    // for show bar
    UI.prototype.showNav = function (){

        document.querySelector('.nav').classList.toggle('nav--show');
        
    }
    UI.prototype.videoControls = function (){

        let btn = document.querySelector('.video__switch-btn');
        if(!btn.classList.contains("slideBtn")){
            btn.classList.add("slideBtn")
            document.querySelector('.video__item').pause()
        }
        else{
            btn.classList.remove("slideBtn")
            document.querySelector('.video__item').play()    
        }
        
    }

    // check for empty values
    UI.prototype.checkEmpty = function (name, lastname, email){
        let result;
        if(name ==='' || lastname ==='' || email ===''){
            result = false;
        }
        else{
            result = true;
        }
        return result;
    } 

    UI.prototype.showFeedback = function(text, type){
        if(type === 'success'){
             let feedback = document.querySelector(".drink-form__feedback");
            feedback.classList.add('success');
            feedback.innerText = text;
            this.removeAlert('success');
        }
        else if(type === 'error'){
            let feedback = document.querySelector(".drink-form__feedback");
            feedback.classList.add('error');
            feedback.innerText = text;
            this.removeAlert('error'); 
        }
    }

    UI.prototype.removeAlert = function(type){
        setTimeout(function(){
            document.querySelector(".drink-form__feedback").classList.remove(type);
        }, 3000)
    }
    

    UI.prototype.addCustomer = function(customer){
        const images = [1, 2, 3, 4, 5];
        let random  =  Math.floor(Math.random() * images.length);
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `<img src="img/person-${random}.jpeg" class="person_thumbnail" alt=""><h4 class="person_name">${customer.name}</h4><h4 class="person_last-name">${customer.lastname}</h4>`
        document.querySelector(".drink-card__list").appendChild(div)
    
    }

    // modal
    UI.prototype.showModal = function(event){
        if (event.target.parentElement.classList.contains('work-item__icon')); 
        let id = event.target.parentElement.dataset.id

        const modal = document.querySelector(".work-modal");
        const modalItem = document.querySelector(".work-modal__item");

        modal.classList.add('work-modal--show');
        modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`


    }
     //hide modal 
    UI.prototype.closeModal = function(){
        document.querySelector(".work-modal").classList.remove('work-modal--show')        
    } 
    // Constructor  
    function Customer(name, lastname, email){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        
    }