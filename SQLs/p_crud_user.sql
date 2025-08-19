CREATE PROCEDURE `railway`.`sp_crud_user`(
	IN p_action VARCHAR(10),
	IN p_user_id INT,
	IN p_full_name VARCHAR(100),
	IN p_phone_number VARCHAR(20),
	IN p_whatsapp_number VARCHAR(20),
	IN p_email VARCHAR(100),
	IN p_user_name VARCHAR(50),
	IN p_password VARCHAR(255),
	IN p_type VARCHAR(50),
	IN p_state VARCHAR(50),
	IN p_created_by VARCHAR(50),
	IN p_last_updated_by VARCHAR(50),
	IN p_created_date DATETIME,
	IN p_updated_date DATETIME,
	IN p_otp_code VARCHAR(10),
	IN p_otp_expires_at DATETIME)
    
    BEGIN
        DECLARE v_otp_code VARCHAR(10) DEFAULT NULL ;
        DECLARE v_otp_expires_at DATETIME DEFAULT NULL;
        DECLARE v_state VARCHAR(50);

        DECLARE email_count INT DEFAULT 0;
        DECLARE username_count INT DEFAULT 0;
        DECLARE phone_count INT DEFAULT 0;
        DECLARE user_count INT DEFAULT 0;

        IF p_action = 'update' THEN
            
            SELECT COUNT(*) INTO email_count WHERE `email`=p_email AND user_id !=p_user_id;
            SELECT COUNT(*) INTO username_count WHERE `user_name`=p_user_name AND user_id !=p_user_id;
            SELECT COUNT(*) INTO phone_count WHERE `phone_number`=p_phone_number AND user_id !=p_user_id;
            IF (email_count > 0) THEN 
                SELECT "email" AS resault;
            ELSEIF (username_count > 0) THEN
                SELECT "user_name" AS resault;
            ELSEIF (phone_count > 0) THEN 
                SELECT "phone_number" AS resault;
            ELSE 
                UPDATE  `user` SET
                    `full_name` =COALESCE(p_full_name ,`full_name` ),
                    `phone_number` =COALESCE(p_phone_number ,`phone_number` ),
                    `whatsapp_number` =COALESCE(p_whatsapp_number ,`whatsapp_number` ),
                    `email` =COALESCE(p_email,`email`),
                    `user_name`=COALESCE(p_user_name,`user_name`) ,
                    `password`=COALESCE(p_password,`password`) ,
                    `state`=COALESCE(p_state,`state`) ,
                    `last_updated_by`=COALESCE(p_user_name,`user_name`),
                    `updated_date`=NOW(),
                    `otp_code`=COALESCE(p_otp_code,`otp_code`),
                    `otp_expires_at`=COALESCE(p_otp_expires_at,`otp_expires_at`) 
                WHERE `user_id` = p_user_id;
                SELECT * FROM `user` WHERE `user_id` = p_user_id;
            END IF;

        ELSEIF p_action = 'create' THEN

            SELECT COUNT(*) INTO email_count FROM `user` WHERE `email` = p_email;
            SELECT COUNT(*) INTO username_count FROM `user` WHERE `user_name` = p_user_name;
            SELECT COUNT(*) INTO phone_count FROM `user` WHERE `phone_number` = p_phone_number;
            
            IF (email_count>0)THEN 
                SELECT 'email' AS resault;
            
            ELSEIF (username_count>0) THEN 
                SELECT 'user_name' AS resault;
            
            ELSEIF (phone_count >0) THEN 
                SELECT 'phone_number'AS resault;
                
            ELSE
                INSERT INTO `user`
                    (`full_name`,`phone_number`,`whatsapp_number`,`email`,`user_name`,`password`,`type`,`state`,`created_by`,`last_updated_by`,`created_date`,`updated_date`,`otp_code`,`otp_expires_at`)
                VALUES 
                    (p_full_name,p_phone_number,p_whatsapp_number,p_email,p_user_name,p_password,p_type,p_state,p_created_by,p_last_updated_by,p_created_date,p_updated_date,p_otp_code,p_otp_expires_at);
                
                SELECT * FROM `user` WHERE `email`=p_email;
                
            END IF;
          
        ELSEIF p_action = 'delete' THEN
            
            SELECT COUNT(*) INTO user_count FROM `user` WHERE `user_id`= p_user_id AND `state`!="deleted";
            
            IF (user_count=1) THEN
            
                UPDATE `user` SET `state` = "deleted" WHERE `user_id`= p_user_id;
                UPDATE `real_estate` SET `status` = "DELETED" WHERE  `user_id` = p_user_id;
            ELSE
                SELECT "user_id" AS resault ;
            END IF;
            
        ELSEIF p_action = 'activate' THEN
        
            SELECT COUNT(*) INTO user_count FROM `user` WHERE `user_id` = p_user_id;
            IF user_count = 1 THEN 
            
                SELECT `otp_code`, `otp_expires_at`,`state` INTO v_otp_code, v_otp_expires_at,v_state FROM `user` WHERE `user_id` = p_user_id;
                
                IF v_otp_expires_at < NOW() THEN 
                    
                    SELECT "expired" AS resault;
                
                ELSEIF v_otp_code != p_otp_code THEN 
                    
                    SELECT "wrong" AS resault;
                
                ELSEIF v_state = 'inactivated' THEN
                    
                    UPDATE `user` SET `state`='activated', `otp_code`=NULL, `otp_expires_at` =NULL WHERE `user_id` = p_user_id;
                    SELECT * FROM `user` WHERE `user_id` = p_user_id;
                
                ELSEIF v_state = 'activated' THEN
                    
                    SELECT "already_act" AS  resault;
                    
                END IF;
            ELSE
                SELECT "user_id" AS resault;
            END IF; 	
                
        ELSEIF p_action = 'login' THEN 
            
            SELECT COUNT(*) INTO email_count FROM `user` WHERE (`email` = p_email OR `phone_number` = p_email OR `user_name` = p_email);
            IF(email_count = 0) THEN
                SELECT "email" AS resault ;
            ELSE
                UPDATE `user` SET `last_login` = NOW() WHERE (`email` = p_email OR phone_number = p_email OR user_name = p_email);
                SELECT * FROM `user` WHERE (`email` = p_email OR phone_number = p_email OR user_name = p_email);
            END IF;

        ELSEIF p_action = 'email' THEN 
        
            SELECT * FROM `user` WHERE (`email` = p_email);
            
        ELSEIF p_action = 'user_name' THEN 
        
            SELECT * FROM `user` WHERE (`user_name`=p_user_name);
            
        ELSEIF p_action = 'user_id' THEN 
        
            SELECT * FROM `user` WHERE (`user_id`=p_user_id);
        
        END IF;
    END