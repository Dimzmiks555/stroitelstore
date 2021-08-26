Executing (default):SELECT count(`attributes`.`id`) AS `count`
FROM `attributes` AS `attributes` LEFT OUTER
JOIN `groups` AS `group`
    ON `attributes`.`group_id` = `group`.`guid`
WHERE `attributes`.`group_id` = 'e4288d51-b14d-11eb-943b-18c04d2a3938'; Executing (default):SELECT `attributes`.`id`,
         `attributes`.`title`,
         `attributes`.`group_id`,
         `group`.`guid` AS `group.guid`,
         `group`.`title` AS `group.title`,
         `group`.`parent_group` AS `group.parent_group`
FROM `attributes` AS `attributes` LEFT OUTER
JOIN `groups` AS `group`
    ON `attributes`.`group_id` = `group`.`guid`
WHERE `attributes`.`group_id` = 'e4288d51-b14d-11eb-943b-18c04d2a3938'; Executing (default):SELECT `good`.*,
         `goods_attributes`.`id` AS `goods_attributes.id`,
         `goods_attributes`.`attr_id` AS `goods_attributes.attr_id`,
         `goods_attributes`.`good_id` AS `goods_attributes.good_id`,
         `goods_attributes`.`value` AS `goods_attributes.value`,
         `goods_attributes->attribute`.`id` AS `goods_attributes.attribute.id`,
         `goods_attributes->attribute`.`title` AS `goods_attributes.attribute.title`,
         `goods_attributes->attribute`.`group_id` AS `goods_attributes.attribute.group_id`,
         `group`.`guid` AS `group.guid`,
         `group`.`title` AS `group.title`,
         `group`.`parent_group` AS `group.parent_group`,
         `prices_and_count`.`good_guid` AS `prices_and_count.good_guid`,
         `prices_and_count`.`price` AS `prices_and_count.price`,
         `prices_and_count`.`sku` AS `prices_and_count.sku`,
         `prices_and_count`.`unit` AS `prices_and_count.unit`,
         `prices_and_count`.`amount` AS `prices_and_count.amount`
FROM 
    (SELECT `good`.`guid`,
         `good`.`title`,
         `good`.`group_id`
    FROM `goods` AS `good`
    WHERE `good`.`group_id` = 'e4288d51-b14d-11eb-943b-18c04d2a3938'
            AND 
        (SELECT `good_id`
        FROM `goods_attributes` AS `goods_attributes`
        WHERE (((`goods_attributes`.`attr_id` = '3'
                AND `goods_attributes`.`value` IN ('ROYCE'))
                AND (`goods_attributes`.`attr_id` = '2'
                AND `goods_attributes`.`value` IN ('Дуб рене')))
                AND `goods_attributes`.`good_id` = `good`.`guid`) LIMIT 1 ) IS NOT NULL LIMIT 0, 20) AS `good`
    INNER JOIN `goods_attributes` AS `goods_attributes`
    ON `good`.`guid` = `goods_attributes`.`good_id`
        AND ((`goods_attributes`.`attr_id` = '3'
        AND `goods_attributes`.`value` IN ('ROYCE'))
        AND (`goods_attributes`.`attr_id` = '2'
        AND `goods_attributes`.`value` IN ('Дуб рене'))) LEFT OUTER
JOIN `attributes` AS `goods_attributes->attribute`
    ON `goods_attributes`.`attr_id` = `goods_attributes->attribute`.`id` LEFT OUTER
JOIN `groups` AS `group`
    ON `good`.`group_id` = `group`.`guid` LEFT OUTER
JOIN `prices_and_counts` AS `prices_and_count`
    ON `good`.`guid` = `prices_and_count`.`good_guid`; Executing (default):SELECT `goods_attributes`.`id`,
         `goods_attributes`.`attr_id`,
         `goods_attributes`.`good_id`,
         `goods_attributes`.`value`,
         `attribute`.`id` AS `attribute.id`,
         `attribute`.`title` AS `attribute.title`,
         `attribute`.`group_id` AS `attribute.group_id`
FROM `goods_attributes` AS `goods_attributes`
INNER JOIN `attributes` AS `attribute`
    ON `goods_attributes`.`attr_id` = `attribute`.`id`
        AND `attribute`.`group_id` = 'e4288d51-b14d-11eb-943b-18c04d2a3938';