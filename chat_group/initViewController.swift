//
//  initViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 8/22/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class initViewController: UIViewController{
    
    override func viewDidAppear(_ animated: Bool) {
        UserDefaults.standard.removeObject(forKey: "Username")
        UserDefaults.standard.removeObject(forKey: "Password")
        
        if  UserDefaults.standard.object(forKey: "Username") != nil{
            
            if  UserDefaults.standard.object(forKey: "Password") != nil{
                self.performSegue(withIdentifier: "hasUsername", sender: nil)

            }
            else {
                self.performSegue(withIdentifier: "needUsername", sender: nil)

            }
            
        } else {
             self.performSegue(withIdentifier: "needUsername", sender: nil)
        }

    }

}
