package com.hotel.restaurant.dto;

import lombok.Data;
import java.util.List;

@Data
public class RestaurantOrderDto {

    private Integer restaurantOrderId;

    private Integer customerId;
    private Integer staffId;
    private Integer restaurantTableId;
    private Integer tableBookingId;

    private String orderDate;   // String (for frontend)
    private double totalCost;

    private String status;
    private String diningLocation;

    private List<Integer> foodItemIds;

    private Integer billId;
}