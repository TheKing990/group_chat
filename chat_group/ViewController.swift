//
//  ViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 8/20/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate{
    @IBOutlet var userName: UITextField!
    @IBOutlet var passWord: UITextField!
    @IBAction func SummitButton(_ sender: AnyObject) {
        
        print("hey \(userName.text!) \(passWord.text!)")
        
        if let name = userName.text {
            UserDefaults.standard.set(name,forKey: "Username")
            
            if let pass = passWord.text {
                UserDefaults.standard.set(pass,forKey: "Password")
            } else {
                
            }
            
        } else {
            
        }
       
        


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

