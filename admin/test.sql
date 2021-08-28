WHERE (((`goods_attributes`.`attr_id` = '3'
                AND `goods_attributes`.`value` IN ('ROYCE'))
                AND (`goods_attributes`.`attr_id` = '2'
                AND `goods_attributes`.`value` IN ('Дуб рене')))
                AND `goods_attributes`.`good_id` = `good`.`guid`)