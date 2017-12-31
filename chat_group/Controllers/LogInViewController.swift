//
//  LogInViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 12/24/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit
import Alamofire

class LogInViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet var logUsername: UITextField!
    @IBOutlet var logPassword: UITextField!
    
  
    
    @IBAction func logInBTN(_ sender: Any) {
        print("click")
        if   logUsername.text == "" || logPassword.text == " " {
            return;
        }
            
        AuthService.instance.logInUser(username: logUsername.text!, password: logPassword.text!)
        return
        
        
    }
   
    override func viewDidLoad() {
        super.viewDidLoad()
       


    }

  

    // MARK: - Table view data source

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
