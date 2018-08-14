import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ///uniqueNameofGeneralChannel: String = "";
  subscribedChannelsUniqueName: any = [];
  subscribedChannelsSID: any = [];

  channelsUniqueName: any = [];
  channelsSID: any = [];

  userName: any;

  constructor(
    private generalService: GeneralService,
    private messageService: MessageService,
    private route: Router
  ) {

    this.generalService.getChannelUniqueName().subscribe(                 //calling method to retrieve all channels unique_name
      (response) => {
        console.log(response);
        for (var i = 0; i < response.channels.length; i++) {
          if (response.channels[i].unique_name != null && response.channels[i].members_count == 0) {
            this.channelsUniqueName.push(response.channels[i].unique_name);
            this.channelsSID.push(response.channels[i].sid);
          }
        }
      },
      (err) => { console.log(err) }
    );

    this.userName = this.generalService.getUserName();

  }

  ngOnInit() {
    this.generalService.getChannelUniqueName().subscribe(                 //calling method to retrieve all channels unique_name
      (response) => {
        // console.log(response);
        for (var i = 0; i < response.channels.length; i++) {
          if (response.channels[i].unique_name != null && response.channels[i].members_count != 0) {
            this.subscribedChannelsUniqueName.push(response.channels[i].unique_name);
            this.subscribedChannelsSID.push(response.channels[i].sid);
          }
        }
        console.log(this.subscribedChannelsUniqueName);
      }
      ,
      (err) => { console.log(err) }
    );
    //console.log(this.channelsUniqueName);
    console.log(this.channelsSID);
  }

  channelName: string;
  messagesArray: any = [];

  selectedChannel(name: string) {
    this.messagesArray = [];
    this.channelName = name;
    var indexOfSelectedChannel = this.subscribedChannelsUniqueName.indexOf(name);
   // setInterval(() => {
      this.messageService.showMessages(this.subscribedChannelsSID[indexOfSelectedChannel]).subscribe(
        (response) => {
          for (var i = 0; i < response.messages.length; i++) {
            this.messagesArray.push(response.messages[i].body + "  from :" + response.messages[i].from);
          }
        },
        (err) => { console.log(err) }
      );
   // }, 500
    //)
  }



  messageBody: any;
  indexOfSelectedChannelToSendMsg: any;

  addNewMessage(message: String) {
    this.messageBody = message;
    this.indexOfSelectedChannelToSendMsg = this.subscribedChannelsUniqueName.indexOf(this.channelName);
    this.sendMessage(this.messageBody, this.subscribedChannelsSID[this.indexOfSelectedChannelToSendMsg]);
  }

  sendMessage(messageBody, channelSID) {
    this.messageService.sendMessage(messageBody, channelSID).subscribe(res => {
      console.log(res.body);
    },
      err => {
        console.log(err);
      });
  }


  // addNewChatroom(name: String){

  //   this.generalService.createChannel(name)             //calling method to create channel in service.
  //       .subscribe(
  //         (response) => {console.log(response)},
  //         (error) => {console.log(error)}
  //       );  
  // }

  chooseNewChannel(channelName) {
    this.indexOfSelectedChannelToSendMsg = this.channelsUniqueName.indexOf(this.channelName);
    this.subscribeToChannel(this.channelsSID[this.indexOfSelectedChannelToSendMsg]);
    var channelSID = this.channelsSID[this.indexOfSelectedChannelToSendMsg];

    this.subscribedChannelsUniqueName.push(channelName);
    this.subscribedChannelsSID.push(channelSID);
    this.channelsUniqueName.splice(this.channelsUniqueName.indexOf(channelName), 1);
    this.channelsSID.splice(this.channelsUniqueName.indexOf(channelName), 1);
  }

  subscribeToChannel(channelUniqueName) {
    this.generalService.joinChannel(channelUniqueName)
      .subscribe(
        (response) => {
          console.log(response.unique_name)
        },
        (error) => {
          console.log(error)
          alert("already subscribed");
          console.log("already subscribed");
        }
      );
  }

  logout(){
    this.route.navigate(["/"]);
    this.generalService.setUserName(null);
    this.messageService.setUserName(null);
    this.messageService.setUserID(null);
    this.generalService.setUserID(null);
  }

}