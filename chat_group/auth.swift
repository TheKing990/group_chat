//
//  auth.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 9/13/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import Foundation
import Alamofire

class AuthService {
    
    
    
    
    static let instance = AuthService()
    
    let defaults = UserDefaults.standard
    
    var isRegistered: Bool? {
        get {
            return defaults.bool(forKey: DEFAULTS_REGISTERED) == true
        }
        set {
            defaults.set(newValue, forKey: DEFAULTS_REGISTERED)
        }
    }
    
    var isAuthenticated: Bool? {
        get {
            return defaults.bool(forKey: DEFAULTS_AUTHENTICATED) == true
        }
        set {
            defaults.set(newValue, forKey: DEFAULTS_AUTHENTICATED)
        }
    }
    
    var username : String? {
        get {
            return defaults.value(forKey: DEFAULTS_EMAIL) as? String
        }
        set {
            defaults.set(newValue, forKey: DEFAULTS_EMAIL)
        }
    }
    
    func logInUser(username: String, password: String){
      
        let json = ["username": username, "password": password]
       
        
       
        let token = "TOkenQWxhZGRpbjpvcGVuIHNlc2FtZQ=="
        let headers = ["Authorization": "bearer \(token)",
            "Content-Type": "application/json"]
      
  
        //print(json);
        var urlComponent = URLComponents(string: Post_logIn)!
        var request = URLRequest(url: urlComponent.url!)
        request.httpMethod = "Post"
        request.httpBody = try? JSONSerialization.data(withJSONObject: json)
        request.allHTTPHeaderFields = headers
      
        Alamofire.request(request).responseJSON { response in
            
            if let json = response.result.value {
                let JSON = json as! NSDictionary
                let mytoken = JSON["token"]!
                print (mytoken)
                self.defaults.set(mytoken, forKey: "User_Token")
                self.isAuthenticated = true
            }
 //debugPrint(response)
        }
 
        /*
        Alamofire.request(Post_logIn,method: .post, headers: headers)
            .responseJSON { response in
                debugPrint(response)
        }
 */
        return
    }
    
    
    func registerUser(email username: String, password: String, completion: @escaping callback) {
        
        let json = ["username": username, "password": password]
        
        let sessionConfig = URLSessionConfiguration.default
        
        let session = URLSession(configuration: sessionConfig, delegate: nil, delegateQueue: nil)
        
        guard let URL = URL(string: Post_Account) else {
            isRegistered = false
            completion(false)
            return
        }
        print("HEY SJDFAOSJF ASJFLKJLF;JDASLFJASJDF AS;FJAKSJLF ALS DJFLJSADLKJF LSAJDFKLJASLDFJAS DFFDKLASFADKLSJFAS\(URL)")
        
        var request = URLRequest(url: URL)
        request.httpMethod = "POST"
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: json, options: [])
            
            let task = session.dataTask(with: request, completionHandler: { (data: Data?, response: URLResponse?, error: Error?) in
                if (error == nil) {
                    // Success
                    let statusCode = (response as! HTTPURLResponse).statusCode
                    print("URL Session Task Succeeded: HTTP \(statusCode)")
                    
                    // Check for status 200 or 409
                    if statusCode != 200 && statusCode != 409 {
                        self.isRegistered = false
                        completion(false)
                        return
                    } else {
                        self.isRegistered = true
                        completion(true)
                    }
                } else {
                    // Failure
                    print("URL Session Task Failed: \(error?.localizedDescription)")
                    completion(false)
                }
            })
            task.resume()
            session.finishTasksAndInvalidate()
            
        } catch let err {
            self.isRegistered = false
            completion(false)
            print(err)
        }
    }
    
   
    
}
