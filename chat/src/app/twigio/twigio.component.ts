import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-twigio',
  templateUrl: './twigio.component.html',
  styleUrls: ['./twigio.component.css']
})
export class TwigioComponent implements OnInit {

  channelName: String;

  channelsArray: any=[];

  constructor(private reqservice : RequestsService) { }

  ngOnInit() {

    this.reqservice.getAllChannels().subscribe(                 //calling method to retrieve all channels friendly_name
      (response) => {
          for(var i = 0 ; i < response.channels.length ; i++){
          if(response.channels[i].unique_name != null)
            {this.channelsArray.push(response.channels[i].unique_name);}
        }
       },
      (err)=>{console.log(err)}
    );
  
  }

  addNewChatroom(name: String){

    this.channelName = name;
    this.reqservice.createChannel(this.channelName)             //calling method to create channel in service.
        .subscribe(
          (response) => {console.log(response)},
          (error) => {console.log(error)}
        );
   
  }

  channelUniqueName: any; 

  retreivingChannelSID(name: String) {
    this.channelUniqueName = name;
    this.reqservice.gettingChannelSID(this.channelUniqueName).subscribe(
      (response) => {
        this.channelUniqueName = "hello"
        console.log(response);
        //response.sid;
      }
      ,
      (error) => { console.log(error); }
    );
  }     
  
  channelUniqueNametoShow: any;

  subscribeToChannel(channelUniqueName){
    this.reqservice.joinChannel(channelUniqueName)
    .subscribe(
      (response) => {console.log(response.unique_name)
                     this.channelUniqueNametoShow = response.unique_name},
      (error) => {console.log(error)
                  console.log("already subscribed");}
    );
  }

  message: String;

  send(str, channelUniqueName){
    this.reqservice.sendMessage(str, channelUniqueName).subscribe(res=>{
      console.log(res.body);
     // var tableRef = document.getElementById(messageBody);
      this.message = res.body;
    },
    err=>{
      console.log(err);
    });
  }



}
