import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  httpheaders = {
    headers: new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUNmMjZkMjYwYjVhNmY3ODdhODZmNzg3NzZmZDYwYjdkYTpmMjdlYzMzMGQyZDQ0ZGZiMzQ4ZjhlYTMzMjk1ZTQ0Zg=='
    })
  }

  constructor(private http: HttpClient) { }

  //sending request to create channel
  createChannel(channelName: any): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services/ISadfef53b68914701bb2fc3da09ef6a78/Channels',
      'UniqueName=' + channelName,
      this.httpheaders);
  }

  //sending request to retrieve info of all channels
  getAllChannels(): Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/ISadfef53b68914701bb2fc3da09ef6a78/Channels',
      this.httpheaders)
      .pipe(map(data => data));
  }

  userId: any;

  setID(id: any) {
    this.userId = id;
  }

  //sending request to retreiving channelSID 
  gettingChannelSID(channelName: any) {
    console.log(channelName);
    return this.http.get('https://chat.twilio.com/v2/Services/ISadfef53b68914701bb2fc3da09ef6a78/Channels/' + channelName,
      this.httpheaders)
      .pipe(map(data => data));
  }


  //sending request to join the channel
  joinChannel(CSID: any): Observable<any> {
    console.log(CSID);
    return this.http.post('https://chat.twilio.com/v2/Services/ISadfef53b68914701bb2fc3da09ef6a78/Channels/CH1ba0bbab393f4be6a4e2bafbffd4eb3f/Members',
      "Identity=" + this.userId,
      this.httpheaders);

  }

  //request for sending message
  sendMessage(str, CSID: any): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services/ISadfef53b68914701bb2fc3da09ef6a78/Channels/ CH1ba0bbab393f4be6a4e2bafbffd4eb3f/Messages',
      'ChannelSid=' + CSID + '&ServicesSid=ISadfef53b68914701bb2fc3da09ef6a78' + '&Body=' + str + '&From=+this.userId',
      this.httpheaders);
  }


}
