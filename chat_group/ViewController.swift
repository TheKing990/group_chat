//
//  ViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 8/20/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate{
    
    @IBAction func LogInBtn(_ sender: Any) {
        print ("hey you want to log in ")
    }
    @IBOutlet var userName: UITextField!
    @IBOutlet var passWord: UITextField!
    @IBAction func signupBtn(_ sender: Any) {
        print("sign up");
    }
    
   
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
        
        
    }

}
        /*
        print("hey \(userName.text!) \(passWord.text!)")
        
        if let name = userName.text {
            UserDefaults.standard.set(name,forKey: "Username")
            
            if let pass = passWord.text {
                UserDefaults.standard.set(pass,forKey: "Password")
            } else {
                
            }
            
        } else {
            
        }
 */
    
    /*
        guard let email = userName.text, userName.text != "", let pass = passWord.text, passWord.text != "" else {
            
            return
        }
        
        AuthService.instance.registerUser(email: email, password: pass, completion: { Success in
            if Success {
                print("user was sen")
            } else {
                OperationQueue.main.addOperation {
                    print("there was a problem")
                }
            }
        })
       
        


    }
    @IBAction func SignUpbtn(_ sender: Any) {
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
             
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

  
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }

}
 */

